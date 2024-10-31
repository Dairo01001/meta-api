import { Router } from 'express'
import { deserializeUser, validateResource } from '../middlewares'
import {
  createUserStatusHandler,
  getAllUserStatusHandler,
  updateUserStatusHandler,
} from './user-status.controller'
import {
  CreateUserStatusSchema,
  UpdateUserStatusSchema,
} from './user-status.schema'

export const userStatusRoutes = () => {
  const router = Router()

  router.post(
    '/user-status',
    validateResource(CreateUserStatusSchema),
    deserializeUser,
    createUserStatusHandler,
  )
  router.put(
    '/user-status/:id',
    validateResource(UpdateUserStatusSchema),
    deserializeUser,
    updateUserStatusHandler,
  )
  router.get('/user-status', getAllUserStatusHandler)

  return router
}
