import { Router } from 'express'
import { deserializeUser, validateResource } from '../middlewares'
import {
  createRoleHandler,
  getAllRolesHandler,
  updateRoleHandler,
} from './role.controller'
import { CreateRoleSchema, UpdateRoleSchema } from './role.schema'

export const roleRoutes = (): Router => {
  const router = Router()

  router.post(
    '/',
    validateResource(CreateRoleSchema),
    deserializeUser,
    createRoleHandler,
  )
  router.get('/', deserializeUser, getAllRolesHandler)
  router.put(
    '/:id',
    validateResource(UpdateRoleSchema),
    deserializeUser,
    updateRoleHandler,
  )

  return router
}
