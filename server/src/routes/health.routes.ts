import { Router, Request, Response, RequestHandler } from 'express';
import { healthCheck } from '../controllers/health.controller';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

const router = Router();

// Public health check endpoint
router.get('/', healthCheck as RequestHandler);

// Protected health check endpoint - verifies JWT auth is working
router.get('/auth', authMiddleware, (req: AuthRequest, res: Response) => {
  const user = req.user;
  res.status(200).json({
    status: 'up',
    auth: {
      status: 'authenticated',
      provider: 'google',
      user: {
        id: user?.userId,
        email: user?.email,
        name: user?.name || undefined
      }
    }
  });
});

export default router;