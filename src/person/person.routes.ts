import { Router } from 'express'
import { deserializeUser, validateResource } from '../middlewares'
import { createPersonHandler, updatePersonHandler } from './person.controller'
import { CreatePersonSchema } from './person.schema'

export const personRoutes = (): Router => {
  const router = Router()

  router.post('/', validateResource(CreatePersonSchema), createPersonHandler)
  router.put(
    '/:id',
    deserializeUser,
    validateResource(CreatePersonSchema),
    updatePersonHandler,
  )

  return router
}
