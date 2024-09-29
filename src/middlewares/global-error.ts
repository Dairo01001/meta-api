import { NextFunction, Request, Response } from 'express';
import { HttpRequestError } from '../utils';

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpRequestError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res.status(500).json({ message: 'Internal Server Error' });
};
