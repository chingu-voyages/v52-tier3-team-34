import { Router, Request, Response } from 'express';
import { authenticateJWT } from '../middleware/auth.middleware';
import { User } from '@prisma/client';

interface AuthRequest extends Request {
  user?: User;
}

const router = Router();

/**
 * GET /api/v1/health
 * Basic health check endpoint
 */
router.get('/', (req: Request, res: Response) => {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(404).json({
      status: 'error',
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: `Method ${req.method} not allowed. Use GET instead.`
      }
    });
  }

  // Set proper content type
  res.setHeader('Content-Type', 'application/json');
  
  // Return basic health status
  res.json({
    status: 'up'
  });
});

/**
 * GET /api/v1/health/auth
 * Protected health check endpoint - verifies JWT auth is working
 */
router.get('/auth', authenticateJWT, (req: AuthRequest, res) => {
  res.json({
    status: 'up',
    auth: {
      status: 'authenticated',
      provider: 'google',
      user: {
        id: req.user?.id,
        email: req.user?.email,
        name: req.user?.name,
        profileImage: req.user?.profileImage
      }
    },
    timestamp: new Date().toISOString()
  });
});

export default router;
