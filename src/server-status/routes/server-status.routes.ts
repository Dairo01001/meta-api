import { Router } from 'express'
import { deserializeUser, validateResource } from '../../middlewares'
import {
  findAllServerStatusActiveHandler,
  findAllServerStatusHandler,
  updateServerStatusHandler,
  upsertServerStatusHandler,
} from '../controllers'
import { ServerStatusSchema, UpdateServerStatusSchema } from '../schemas'

export const serverStatusRoutes = (): Router => {
  const router = Router()

  router.patch(
    '/',
    validateResource(ServerStatusSchema),
    deserializeUser,
    upsertServerStatusHandler,
  )
  router.get('/', deserializeUser, findAllServerStatusHandler)
  router.put(
    '/:id',
    validateResource(UpdateServerStatusSchema),
    deserializeUser,
    updateServerStatusHandler,
  )
  router.get('/active', deserializeUser, findAllServerStatusActiveHandler)

  return router
}
