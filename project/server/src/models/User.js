import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: {
      type: String,
      select: false,
      required: function requiredPassword() {
        return this.provider === 'email';
      },
    },
    role: { type: String, enum: ['user'], default: 'user' },
    provider: { type: String, enum: ['email', 'google'], default: 'email' },
    googleId: { type: String, sparse: true, unique: true },
    avatar: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    lastLogin: { type: Date, default: null },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: Date, select: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  if (!this.password) return false;
  return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model('User', userSchema);
