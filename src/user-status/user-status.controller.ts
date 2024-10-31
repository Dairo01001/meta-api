import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import {
  CreateUserStatusInput,
  UpdateUserStatusInput,
} from './user-status.schema'
import {
  createUserStatus,
  getAllUserStatus,
  updateUserStatus,
} from './user-status.service'

export const createUserStatusHandler = async (
  req: Request<{}, {}, CreateUserStatusInput['body']>,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(StatusCodes.CREATED).json(await createUserStatus(req.body))
  } catch (error) {
    next(error)
  }
}

export const updateUserStatusHandler = async (
  req: Request<any, {}, UpdateUserStatusInput['body']>,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(StatusCodes.OK).json(
      await updateUserStatus({
        id: Number(req.params.id),
        status: req.body.status,
      }),
    )
  } catch (error) {
    next(error)
  }
}

export const getAllUserStatusHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(StatusCodes.OK).json(await getAllUserStatus())
  } catch (error) {
    next(error)
  }
}
