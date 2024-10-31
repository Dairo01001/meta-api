import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CreateServerInput } from '../schemas'
import { createServer, findAllServer } from '../services'

export const createServerHandler = async (
  req: Request<{}, {}, CreateServerInput['body']>,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(StatusCodes.OK).json(await createServer(req.body))
  } catch (error) {
    next(error)
  }
}

export const findAllServerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(StatusCodes.OK).json(await findAllServer())
  } catch (error) {
    next(error)
  }
}
