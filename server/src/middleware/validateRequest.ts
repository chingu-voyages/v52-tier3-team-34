import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validateRequest = {
  params: (schema: AnyZodObject) => 
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.params = await schema.parseAsync(req.params);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          res.status(400).json({
            status: 'error',
            message: 'Invalid parameters',
            errors: error.errors
          });
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
          res.status(400).json({
            status: 'error',
            message: 'Invalid query parameters',
            errors: error.errors
          });
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
          res.status(400).json({
            status: 'error',
            message: 'Invalid request body',
            errors: error.errors
          });
        } else {
          next(error);
        }
      }
    }
}; 