import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Admin } from '../models/Admin.js';
import { User } from '../models/User.js';
import {
  generateResetToken,
  hashResetToken,
  sendForgotPasswordEmail,
} from '../services/emailService.js';
import {
  isGoogleAuthConfigured,
  verifyGoogleAuthCode,
  verifyGoogleIdToken,
} from '../services/googleAuthService.js';

const signUserToken = (userId) =>
  jwt.sign({ id: userId, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '7d' });

const signAdminToken = (adminId) =>
  jwt.sign({ id: adminId, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });

const formatUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar || undefined,
  provider: user.provider || 'email',
});

const touchLastLogin = async (user) => {
  user.lastLogin = new Date();
  await user.save();
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      provider: 'email',
      isVerified: false,
      lastLogin: new Date(),
    });

    const token = signUserToken(user._id);

    res.status(201).json({
      token,
      user: formatUserResponse(user),
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (user) {
      if (!user.password) {
        return res.status(401).json({
          message: 'This account uses Google sign-in. Please continue with Google.',
        });
      }

      const valid = await user.comparePassword(password);
      if (!valid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      await touchLastLogin(user);

      const token = signUserToken(user._id);
      return res.json({
        token,
        user: formatUserResponse(user),
      });
    }

    const admin = await Admin.findOne({ email: normalizedEmail });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signAdminToken(admin._id);
    res.json({
      token,
      admin: { id: admin._id, email: admin.email },
      role: 'admin',
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (_req, res) => {
  res.json({ message: 'Logged out successfully' });
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.json({ message: 'If that email exists, a reset link has been sent' });
    }

    const resetToken = generateResetToken();
    user.resetPasswordToken = hashResetToken(resetToken);
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const resetUrl = `${clientUrl}/reset-password?token=${resetToken}`;

    await sendForgotPasswordEmail({ user, resetUrl });

    res.json({ message: 'If that email exists, a reset link has been sent' });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ message: 'Token and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const hashed = hashResetToken(token);
    const user = await User.findOne({
      resetPasswordToken: hashed,
      resetPasswordExpires: { $gt: new Date() },
    }).select('+password +resetPasswordToken +resetPasswordExpires');

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    user.password = password;
    user.provider = user.googleId ? user.provider : 'email';
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    next(err);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    if (!isGoogleAuthConfigured()) {
      return res.status(503).json({ message: 'Google login is not configured on the server' });
    }

    const { credential, code } = req.body;
    if (!credential && !code) {
      return res.status(400).json({ message: 'Google credential or authorization code is required' });
    }

    let googleProfile;
    try {
      googleProfile = credential
        ? await verifyGoogleIdToken(credential)
        : await verifyGoogleAuthCode(code);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Google authentication failed';

      if (/expired/i.test(message)) {
        return res.status(401).json({ message: 'Google session expired. Please try again.' });
      }

      if (/audience|issuer|invalid/i.test(message)) {
        return res.status(401).json({ message: 'Invalid Google token. Please try again.' });
      }

      return res.status(401).json({ message: 'Google authentication failed. Please try again.' });
    }

    let user = await User.findOne({ googleId: googleProfile.googleId });

    if (user) {
      if (googleProfile.avatar) user.avatar = googleProfile.avatar;
      user.isVerified = true;
      await touchLastLogin(user);
    } else {
      user = await User.findOne({ email: googleProfile.email });

      if (user) {
        if (user.googleId && user.googleId !== googleProfile.googleId) {
          return res.status(409).json({
            message: 'This email is already linked to a different Google account',
          });
        }

        user.googleId = googleProfile.googleId;
        if (googleProfile.avatar) user.avatar = googleProfile.avatar;
        user.isVerified = true;
        await touchLastLogin(user);
      } else {
        user = await User.create({
          name: googleProfile.name,
          email: googleProfile.email,
          googleId: googleProfile.googleId,
          avatar: googleProfile.avatar,
          provider: 'google',
          isVerified: googleProfile.emailVerified,
          lastLogin: new Date(),
        });
      }
    }

    const token = signUserToken(user._id);

    res.json({
      token,
      user: formatUserResponse(user),
    });
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }
    next(err);
  }
};

export const getMe = async (req, res) => {
  res.json({
    user: {
      ...formatUserResponse(req.user),
    },
  });
};
