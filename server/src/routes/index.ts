import { Router } from 'express';
import healthRouter from './health.routes';
import userRouter from './user.routes';

const router = Router();

// Mount routes
router.use('/health', healthRouter);
router.use('/users', userRouter);

export default router; 