import jwt from 'jsonwebtoken';
import { JWTPayload } from '../../types/auth.types';

export class JWTService {
  private static readonly secret = process.env.JWT_SECRET as string;
  private static readonly expiresIn = process.env.JWT_EXPIRATION || '1h';

  static generateToken(payload: JWTPayload): string {
    if (!this.secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  static verifyToken(token: string): JWTPayload {
    if (!this.secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    try {
      return jwt.verify(token, this.secret) as JWTPayload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
