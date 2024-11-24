import { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response) => {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(404).json({
      status: 'error',
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: `Method ${req.method} not allowed. Use GET instead.`
      }
    });
  }

  // Set proper content type
  res.setHeader('Content-Type', 'application/json');
  
  // Return basic health status
  res.json({
    status: 'up'
  });
};