import { Router } from 'express'
import { deserializeUser, validateResource } from '../../middlewares'
import { adminAuthorize } from '../../middlewares/admin-authorize'
import { createServerHandler, findAllServerHandler } from '../controller'
import { CreateServerSchema } from '../schemas'

export const serverRoutes = () => {
  const router = Router()

  router.post(
    '/',
    validateResource(CreateServerSchema),
    deserializeUser,
    adminAuthorize,
    createServerHandler,
  )
  router.get('/', findAllServerHandler)

  return router
}
