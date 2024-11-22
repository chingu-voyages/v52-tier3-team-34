import { Router } from 'express';
import healthRouter from './health.routes';
import userRouter from './user.routes';
import eventRouter from './event.routes';
import venueRouter from './venue.routes';

const router = Router();

// Mount v1 routes
const v1Router = Router();
router.use('/v1', v1Router);

// Mount resource routes under v1
v1Router.use('/health', healthRouter);
v1Router.use('/users', userRouter);
v1Router.use('/events', eventRouter);
v1Router.use('/venues', venueRouter);

export default router;