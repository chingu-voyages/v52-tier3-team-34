import jwt from 'jsonwebtoken';
import { JWTPayload } from '../../types/auth.types';
import { config } from '../../config/env';

export class JWTService {
  private static readonly secret = config.JWT_SECRET;
  private static readonly expiresIn = config.JWT_EXPIRATION;

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
