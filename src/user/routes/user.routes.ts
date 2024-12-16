import { Router } from 'express'
import { deserializeUser, validateResource } from '../../middlewares'
import { adminAuthorize } from '../../middlewares/admin-authorize'
import { AuthUserSchema } from '../../schemas'
import {
  createUserHandler,
  getAllUsersHandler,
  getMeHandler,
  getUserByUsernameHandler,
} from '../controller'

export const userRoutes = (): Router => {
  const router = Router()

  router.post('/', validateResource(AuthUserSchema), createUserHandler)
  router.get('/', deserializeUser, adminAuthorize, getAllUsersHandler)
  router.get('/me', deserializeUser, getMeHandler)
  router.get('/:username', getUserByUsernameHandler)

  return router
}
