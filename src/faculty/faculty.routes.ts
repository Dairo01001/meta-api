import { Router } from 'express'
import { deserializeUser, validateResource } from '../middlewares'
import {
  createFacultyHandler,
  deleteFacultyHandler,
  getAllFacultiesHandler,
  getAllStatusFacultiesHandler,
  getFacultyHandler,
  updateFacultyHandler,
} from './faculty.controller'
import {
  CreateFacultySchema,
  DeleteFacultySchema,
  UpdateFacultySchema,
} from './faculty.schema'

export const facultyRoutes = (): Router => {
  const router = Router()

  router.post(
    '/',
    deserializeUser,
    validateResource(CreateFacultySchema),
    createFacultyHandler,
  )
  router.get('/', deserializeUser, getAllFacultiesHandler)
  router.get('/status', getAllStatusFacultiesHandler)
  router.put(
    '/:id',
    deserializeUser,
    validateResource(UpdateFacultySchema),
    updateFacultyHandler,
  )
  router.delete(
    '/:id',
    deserializeUser,
    validateResource(DeleteFacultySchema),
    deleteFacultyHandler,
  )
  router.get('/:id', deserializeUser, getFacultyHandler)

  return router
}
