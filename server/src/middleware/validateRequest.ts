import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { ApiErrorResponse } from '../types/api.types';

export const validateRequest = {
  params: (schema: AnyZodObject) => 
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.params = await schema.parseAsync(req.params);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          const response: ApiErrorResponse = {
            status: 'error',
            error: {
              code: 'USER_CREATE_ERROR',
              message: 'Invalid parameters',
              details: error.errors
            },
            timestamp: new Date().toISOString()
          };
          res.status(400).json(response);
        } else {
          next(error);
        }
      }
    },

  query: (schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.query = await schema.parseAsync(req.query);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          const response: ApiErrorResponse = {
            status: 'error',
            error: {
              code: 'USER_CREATE_ERROR',
              message: 'Invalid query parameters',
              details: error.errors
            },
            timestamp: new Date().toISOString()
          };
          res.status(400).json(response);
        } else {
          next(error);
        }
      }
    },

  body: (schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await schema.parseAsync(req.body);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          const response: ApiErrorResponse = {
            status: 'error',
            error: {
              code: 'USER_CREATE_ERROR',
              message: error.errors[0]?.message || 'Invalid request body',
              details: error.errors
            },
            timestamp: new Date().toISOString()
          };
          res.status(400).json(response);
        } else {
          next(error);
        }
      }
    }
};