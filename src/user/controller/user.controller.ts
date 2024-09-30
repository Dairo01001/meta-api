import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createUser } from '../services';
import { HttpRequestError } from '../../utils';
import { SignInUserInput } from '../../schemas';

export const createUserHandler = async (
  req: Request<{}, {}, SignInUserInput['body']>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.status(StatusCodes.CREATED).json(await createUser(req.body));
  } catch (error) {
    next(error);
  }
};

export const getMeHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;

    res.status(200).json({
      ...user,
    });
  } catch (err: any) {
    next(err);
  }
};
