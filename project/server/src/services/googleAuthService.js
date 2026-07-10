import { OAuth2Client } from 'google-auth-library';

const VALID_ISSUERS = new Set(['accounts.google.com', 'https://accounts.google.com']);

const getOAuthClient = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_CALLBACK_URL || 'postmessage';

  if (!clientId) {
    throw new Error('GOOGLE_CLIENT_ID is not configured');
  }

  return new OAuth2Client(clientId, clientSecret, redirectUri);
};

const mapPayload = (payload) => {
  if (!payload?.sub || !payload?.email) {
    throw new Error('Google account is missing required profile information');
  }

  if (!VALID_ISSUERS.has(payload.iss)) {
    throw new Error('Invalid Google token issuer');
  }

  if (payload.email_verified === false) {
    throw new Error('Google email address is not verified');
  }

  return {
    googleId: payload.sub,
    email: payload.email.toLowerCase().trim(),
    name: payload.name?.trim() || payload.email.split('@')[0],
    avatar: payload.picture || null,
    emailVerified: payload.email_verified !== false,
  };
};

export const verifyGoogleIdToken = async (idToken) => {
  const client = getOAuthClient();
  const clientId = process.env.GOOGLE_CLIENT_ID;

  const ticket = await client.verifyIdToken({
    idToken,
    audience: clientId,
  });

  return mapPayload(ticket.getPayload());
};

export const verifyGoogleAuthCode = async (code) => {
  const client = getOAuthClient();
  const { tokens } = await client.getToken(code);

  if (!tokens.id_token) {
    throw new Error('Google did not return an ID token');
  }

  return verifyGoogleIdToken(tokens.id_token);
};

export const isGoogleAuthConfigured = () => Boolean(process.env.GOOGLE_CLIENT_ID);
