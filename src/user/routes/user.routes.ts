import { Router } from 'express'
import { deserializeUser, validateResource } from '../../middlewares'
import { AuthUserSchema } from '../../schemas'
import { createUserHandler, getMeHandler } from '../controller'

export const userRoutes = (): Router => {
  const router = Router()

  router.post('/', validateResource(AuthUserSchema), createUserHandler)
  router.get('/me', deserializeUser, getMeHandler)

  return router
}
