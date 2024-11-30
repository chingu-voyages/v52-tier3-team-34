import { Router, Request } from 'express';
import { z } from 'zod';
import { GoogleAuthService } from '../services/google-auth.service';
import { UserService } from '../services/user.service';
import { JWTService } from '../services/jwt.service';
import { authenticateJWT } from '../middleware/auth.middleware';
import { User } from '@prisma/client';

// Extend Request type locally
interface AuthRequest extends Request {
  user?: User;
}

const router = Router();

// Validation schema for login request
const loginSchema = z.object({
  googleIdToken: z.string({
    required_error: 'googleIdToken is required',
  }),
});

/**
 * POST /auth/login
 * Login or register with Google ID token
 */
router.post('/login', async (req, res) => {
  try {
    // Validate request body
    const { googleIdToken } = loginSchema.parse(req.body);

    // Verify Google token
    const googleUser = await GoogleAuthService.verifyToken(googleIdToken);

    // Find or create user
    const user = await UserService.findOrCreateFromGoogle({
      email: googleUser.email,
      googleId: googleUser.googleId,
      name: googleUser.name || undefined,
      profileImage: googleUser.profileImage || undefined,
    });

    // Generate JWT
    const token = JWTService.generateToken(user);

    // Return user and token
    res.json({ user, token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid request data', details: error.errors });
    } else {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Authentication failed' });
    }
  }
});

/**
 * GET /auth/profile
 * Get current user profile
 */
router.get('/profile', authenticateJWT, (req: AuthRequest, res) => {
  // User is attached by auth middleware
  res.json({ user: req.user });
});

/**
 * POST /auth/logout
 * Logout user (client will remove token)
 */
router.post('/logout', authenticateJWT, (req: AuthRequest, res) => {
  res.json({ message: 'Logged out successfully' });
});

export default router;
