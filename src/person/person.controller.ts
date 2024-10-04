import { NextFunction, Request, Response } from 'express';
import { CreatePersonInput } from './person.schema';
import { StatusCodes } from 'http-status-codes';
import { createPerson, updatePerson } from './person.service';

export const createPersonHandler = async (
  req: Request<{}, {}, CreatePersonInput['body']>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = res.locals;
    res.status(StatusCodes.CREATED).json(await createPerson({ ...req.body, userId: user.id }));
  } catch (error) {
    next(error);
  }
};

export const updatePersonHandler = async (
  req: Request<any, {}, CreatePersonInput['body']>,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(StatusCodes.OK).json(await updatePerson(Number(req.params?.id), req.body));
  } catch (error) {
    next(error);
  }
};
