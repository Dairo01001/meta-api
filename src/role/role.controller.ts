import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CreateRoleInput, UpdateRoleInput } from './role.schema'
import { createRole, getAllRoles, updateRole } from './role.service'

export const createRoleHandler = async (
  req: Request<{}, {}, CreateRoleInput['body']>,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(StatusCodes.CREATED).json(await createRole(req.body))
  } catch (error) {
    next(error)
  }
}

export const getAllRolesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(StatusCodes.OK).json(await getAllRoles())
  } catch (error) {
    next(error)
  }
}

export const updateRoleHandler = async (
  req: Request<any, {}, UpdateRoleInput['body']>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const { status } = req.body
    res.status(StatusCodes.OK).json(await updateRole(Number(id), status))
  } catch (error) {
    next(error)
  }
}
