import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const unkanowEndpoint = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).send({ message: 'Not found' });
};