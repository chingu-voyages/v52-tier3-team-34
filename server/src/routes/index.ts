import { Router } from 'express';
import healthRouter from './health.routes';
import userRouter from './user.routes';
import eventRouter from './event.routes';
import venueRouter from './venue.routes';

const router = Router();

// Mount routes
router.use('/health', healthRouter);
router.use('/users', userRouter);
router.use('/events', eventRouter);
router.use('/venues', venueRouter);

export default router; 