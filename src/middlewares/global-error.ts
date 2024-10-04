import { NextFunction, Request, Response } from 'express';
import { HttpRequestError } from '../utils';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { StatusCodes } from 'http-status-codes';

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpRequestError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(StatusCodes.CONFLICT).json({ message: 'Unique key is Repeat' });
    }

    if (err.code === 'P2003') {
      return res.status(StatusCodes.CONFLICT).json({ message: 'Unique key is missing' });
    }

    if (err.code === 'P2000') {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid input' });
    }

    console.log(err);
  }

  console.log(err);

  res.status(500).json({ message: 'Internal Server Error' });
};
