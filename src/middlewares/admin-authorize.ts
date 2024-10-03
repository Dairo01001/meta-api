import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const adminAuthorize = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;

    if (user?.role !== 'ADMIN') {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User unauhorized' });
    }
    next();
  } catch (error) {
    next(error);
  }
};
