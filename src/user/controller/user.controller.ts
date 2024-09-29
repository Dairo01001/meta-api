import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createUser } from '../services';
import { HttpRequestError } from '../../utils';
import { SignInUserInput } from '../../schemas';

export const createUserHandler = async (
  req: Request<{}, {}, SignInUserInput['body']>,
  res: Response,
): Promise<void> => {
  try {
    res.status(StatusCodes.CREATED).json(await createUser(req.body));
  } catch (error) {
    if (error instanceof HttpRequestError) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }
};
