import { Router } from 'express'
import { deserializeUser, validateResource } from '../middlewares'
import {
  createProfileHandler,
  updateProfileHandler,
  upsertProfileHandler,
} from './profile.controller'
import { CreateProfileSchema } from './profile.schema'

export const profileRoutes = (): Router => {
  const router = Router()

  router.post(
    '/',
    deserializeUser,
    validateResource(CreateProfileSchema),
    createProfileHandler,
  )
  router.put(
    '/:id',
    deserializeUser,
    validateResource(CreateProfileSchema),
    updateProfileHandler,
  )
  router.patch(
    '/',
    deserializeUser,
    validateResource(CreateProfileSchema),
    upsertProfileHandler,
  )

  return router
}
