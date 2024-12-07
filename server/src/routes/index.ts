import { Router } from 'express';
import healthRouter from './health.routes';
import userRouter from './user.routes';
import eventRouter from './event.routes';
import venueRouter from './venue.routes';
import authRouter from './auth.routes';

const router = Router();

// Mount resource routes 
router.use('/health', healthRouter);
router.use('/users', userRouter);
router.use('/events', eventRouter);
router.use('/venues', venueRouter);
router.use('/auth', authRouter);

export default router;