import { OAuth2Client } from 'google-auth-library';
import { config } from '../config/env';

// Create OAuth client using Google Client ID
const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

export interface GoogleUser {
  googleId: string;
  email: string;
  name: string | null;
  profileImage: string | null;
}

export class GoogleAuthService {
  /**
   * Verify Google ID token and extract user information
   * @param token Google ID token from client
   * @returns User information from Google
   * @throws Error if token is invalid
   */
  static async verifyToken(token: string): Promise<GoogleUser> {
    try {
      // Verify token with Google
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: config.GOOGLE_CLIENT_ID
      });

      // Get user payload
      const payload = ticket.getPayload();
      if (!payload) {
        throw new Error('Invalid token payload');
      }

      // Extract and return user information
      return {
        googleId: payload.sub,
        email: payload.email!,
        name: payload.name || null,
        profileImage: payload.picture || null
      };
    } catch (error) {
      throw new Error(`Failed to verify Google token: ${error}`);
    }
  }
}
