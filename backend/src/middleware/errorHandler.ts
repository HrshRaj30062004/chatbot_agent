import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(' Centralized Error Boundary caught exception:', err.stack);

  res.status(500).json({
    status: 'error',
    message: err.message || 'An unexpected technical issue occurred. Please try your request again.'
  });
};