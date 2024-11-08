import { Router } from 'express';
import healthRouter from './health.routes';

const router = Router();

// Mount routes
router.use('/health', healthRouter);

export default router; 