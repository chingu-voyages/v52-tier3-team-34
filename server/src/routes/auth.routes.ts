import { Router, Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { GoogleUser, AuthResponse, JWTPayload, LoginSchema } from '../types/auth.types';
import { UserService } from '../services/user.service';
import { JWTService } from '../services/auth/jwt.service';
import { TokenInvalidationService } from '../services/auth/token-invalidation.service';
import { authMiddleware } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();
const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

// Error handling wrapper
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

/**
 * Google OAuth Login Endpoint
 * Validates Google ID token and creates/finds user
 */
router.post('/login', 
  validateRequest.body(LoginSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const { googleIdToken } = req.body;
  
    try {
      // Verify Google ID token
      const ticket = await googleClient.verifyIdToken({
        idToken: googleIdToken,
        audience: process.env.GOOGLE_CLIENT_ID
      });
    
      const payload = ticket.getPayload();
    
      if (!payload) {
        return res.status(401).json({ 
          error: 'Authentication Failed',
          message: 'Invalid Google token' 
        });
      }

      // Validate payload fields
      if (!payload.email) {
        return res.status(400).json({ 
          error: 'Invalid Token',
          message: 'Google token missing required email' 
        });
      }

      // Find or create user
      const user = await UserService.findOrCreateFromGoogle({
        email: payload.email,
        name: payload.name || '',
        profileImage: payload.picture || undefined,
        googleId: payload.sub || ''
      });

      // Generate JWT
      const jwtPayload: JWTPayload = {
        userId: user.id,
        email: user.email,
        name: user.name
      };
      const authToken = JWTService.generateToken(jwtPayload);

      // Prepare response
      const authResponse: AuthResponse = {
        token: authToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          picture: user.profileImage || undefined
        }
      };

      res.status(200).json(authResponse);
    } catch (error) {
      console.error('Google login error:', error);
    
      if (error instanceof Error) {
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ 
            error: 'Token Expired',
            message: 'Google ID token has expired' 
          });
        }
      
        if (error.name === 'JsonWebTokenError') {
          return res.status(401).json({ 
            error: 'Invalid Token',
            message: 'Google ID token is invalid' 
          });
        }
      }

      res.status(500).json({ 
        error: 'Authentication Failed',
        message: 'Unable to complete Google authentication' 
      });
    }
  }));

// Public health check
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'up'
  });
});

// Protected authentication health check
router.get('/health/auth', 
  authMiddleware, 
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    res.status(200).json({
      status: 'up',
      auth: {
        status: 'authenticated',
        provider: 'google',
        user: {
          id: user.userId,
          email: user.email,
          name: user.name || undefined,
          profileImage: user.profileImage || undefined
        }
      }
    });
  })
);

/**
 * Logout Endpoint
 * This is primarily a client-side token clearing mechanism
 * Server-side, we rely on short-lived JWTs and token invalidation
 */
router.post('/logout', 
  authMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    // Get token from Authorization header
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (token) {
      // Invalidate the current token
      TokenInvalidationService.invalidateToken(token);
    }

    // Client should clear the token on their end
    res.status(200).json({ 
      status: 'success', 
      message: 'Logout successful. Token invalidated.' 
    });
  })
);

/**
 * User Profile Endpoint
 * Retrieves authenticated user's profile information
 */
router.get('/profile', 
  authMiddleware, 
  asyncHandler(async (req: Request, res: Response) => {
    // req.user is set by authMiddleware
    const userId = (req as any).user.userId;
    
    try {
      const user = await UserService.findById(userId);
      
      if (!user) {
        return res.status(404).json({ 
          error: 'User Not Found', 
          message: 'Unable to retrieve user profile' 
        });
      }

      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.profileImage
      });
    } catch (error) {
      res.status(500).json({ 
        error: 'Profile Retrieval Failed', 
        message: 'An error occurred while fetching user profile' 
      });
    }
  })
);

export default router;
