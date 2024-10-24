import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateServerStatusInput } from '../schemas';
import { findAllServerStatus, upsertServerStatus } from '../services';

export const upsertServerStatusHandler = async (
  req: Request<{}, {}, CreateServerStatusInput['body']>,
  res: Response,
  next: NextFunction,
) => {
  const { name, status } = req.body;

  try {
    return res.status(StatusCodes.CREATED).json(
      await upsertServerStatus({
        name,
        status: status || true,
      }),
    );
  } catch (error) {
    next(error);
  }
};

export const findAllServerStatusHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(StatusCodes.OK).json(await findAllServerStatus());
  } catch (error) {
    next(error);
  }
};
