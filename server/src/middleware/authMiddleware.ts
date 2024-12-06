import { Request, Response, NextFunction } from 'express';
import { JWTService } from '../services/auth/jwt.service';
import { JWTPayload } from '../types/auth.types';

// Define a local interface for AuthRequest
interface AuthRequest extends Request {
  user?: JWTPayload;
}

// Middleware to verify JWT and extract user information
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access token is missing or invalid' });
    return;
  }

  try {
    const decoded = JWTService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token verification failed', error });
    return;
  }
};
