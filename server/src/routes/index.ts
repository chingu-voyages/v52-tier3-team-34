import { Router } from 'express';
import healthRouter from './health.routes';
import userRouter from './user.routes';
import eventRouter from './event.routes';

const router = Router();

// Mount routes
router.use('/health', healthRouter);
router.use('/users', userRouter);
router.use('/events', eventRouter);

export default router; 