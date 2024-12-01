import { Request, Response, NextFunction } from 'express';
import { JWTService } from '../services/jwt.service';
import { TokenInvalidationService } from '../services/token-invalidation.service';

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Bearer TOKEN

  try {
    // Check if token is invalidated
    if (TokenInvalidationService.isTokenInvalidated(token)) {
      return res.status(401).json({ error: 'Token has been invalidated' });
    }

    // Verify JWT
    const decoded = JWTService.verifyToken(token);
    req.user = decoded as Express.User;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Not authenticated' });
};
