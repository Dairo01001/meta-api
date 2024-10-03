import { NextFunction, Request, Response } from 'express';
import { CreateProgramInput } from './program.schema';
import { StatusCodes } from 'http-status-codes';
import { createProgram, getAllPrograms, getProgramById } from './program.service';

export const createProgramHandler = async (
  req: Request<{}, {}, CreateProgramInput['body']>,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(StatusCodes.CREATED).json(await createProgram(req.body));
  } catch (error) {
    next(error);
  }
};

export const getAllProgramsHandler = async (_: Request, res: Response, next: NextFunction) => {
  try {
    res.status(StatusCodes.OK).json(await getAllPrograms());
  } catch (error) {
    next(error);
  }
};

export const getProgramHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(StatusCodes.OK).json(await getProgramById(Number(req.params?.id)));
  } catch (error) {
    next(error);
  }
};
