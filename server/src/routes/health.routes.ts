import { Router, RequestHandler } from 'express';
import { healthCheck } from '../controllers/health.controller';

const router = Router();

// Health check endpoint at /api/v1/health
router.get('/', healthCheck as RequestHandler);

export default router;