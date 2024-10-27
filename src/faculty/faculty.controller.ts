import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import {
  createFaculty,
  CreateFacultyInput,
  deleteF,
  DeleteFacultyInput,
  getAllFaculties,
  getAllStatusFaculties,
  updateFaculty,
  UpdateFacultyInput,
} from '.'

export const createFacultyHandler = async (
  req: Request<{}, {}, CreateFacultyInput['body']>,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(StatusCodes.CREATED).json(await createFaculty(req.body))
  } catch (error) {
    next(error)
  }
}

export const getAllFacultiesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(StatusCodes.OK).json(await getAllFaculties())
  } catch (error) {
    next(error)
  }
}

export const getAllStatusFacultiesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(StatusCodes.OK).json(await getAllStatusFaculties())
  } catch (error) {
    next(error)
  }
}

export const deleteFacultyHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(StatusCodes.OK).json(await deleteF(Number(req.params?.id)))
  } catch (error) {
    next(error)
  }
}

export const updateFacultyHandler = async (
  req: Request<DeleteFacultyInput['params'], {}, UpdateFacultyInput['body']>,
  res: Response,
  next: NextFunction,
) => {
  try {
    res
      .status(StatusCodes.OK)
      .json(await updateFaculty(Number(req.params?.id), req.body))
  } catch (error) {
    next(error)
  }
}
