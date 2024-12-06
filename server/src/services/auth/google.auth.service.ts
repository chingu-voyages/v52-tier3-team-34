import { OAuth2Client } from 'google-auth-library';
import { GoogleUser } from '../../types/auth.types';

export class GoogleAuthService {
  private static readonly client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  static async verifyGoogleToken(token: string): Promise<GoogleUser> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload();
      if (!payload) {
        throw new Error('No payload in Google token');
      }

      if (!payload.email || !payload.name) {
        throw new Error('Missing required user information in Google token');
      }

      return {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        given_name: payload.given_name,
        family_name: payload.family_name
      };
    } catch (error) {
      throw new Error('Failed to verify Google token');
    }
  }
}
