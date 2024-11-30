import jwt from 'jsonwebtoken';
import { UserResponse } from '../types/user.types';

export class JWTService {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
  private static readonly JWT_EXPIRES_IN = '24h';

  static generateToken(user: UserResponse): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      this.JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN }
    );
  }

  static verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET);
      return decoded as jwt.JwtPayload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
