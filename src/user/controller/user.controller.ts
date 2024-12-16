import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { SignInUserInput } from '../../schemas'
import { createUser, findAllUsers, findUniqueUserByUsername } from '../services'

export const createUserHandler = async (
  req: Request<{}, {}, SignInUserInput['body']>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.status(StatusCodes.CREATED).json(await createUser(req.body))
  } catch (error) {
    next(error)
  }
}

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = res.locals.user

    res.status(200).json({
      ...user,
    })
  } catch (err: any) {
    next(err)
  }
}

export const getUserByUsernameHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await findUniqueUserByUsername(req.params.username)
    res.status(StatusCodes.OK).json(user)
  } catch (err: any) {
    next(err)
  }
}

export const getAllUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(StatusCodes.OK).json(await findAllUsers())
  } catch (err: any) {
    next(err)
  }
}
