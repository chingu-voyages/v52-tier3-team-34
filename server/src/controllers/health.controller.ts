import { Request, Response } from 'express';
import { ApiResponse } from '../types/api.types';

export const healthCheck = (req: Request, res: Response) => {
  const response: ApiResponse<null> = {
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  };
  
  res.json(response);
}; 