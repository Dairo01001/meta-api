import { Router } from 'express'
import { deserializeUser, validateResource } from '../../middlewares'
import { adminAuthorize } from '../../middlewares/admin-authorize'
import {
  createServerHandler,
  findAllServerHandler,
  findByIdHandler,
} from '../controller'
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
  router.get('/:id', deserializeUser, findByIdHandler)

  return router
}
