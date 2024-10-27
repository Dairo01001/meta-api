import { Router } from 'express'
import { validateResource } from '../middlewares'
import {
  createFacultyHandler,
  deleteFacultyHandler,
  getAllFacultiesHandler,
  getAllStatusFacultiesHandler,
  updateFacultyHandler,
} from './faculty.controller'
import {
  CreateFacultySchema,
  DeleteFacultySchema,
  UpdateFacultySchema,
} from './faculty.schema'

export const facultyRoutes = (): Router => {
  const router = Router()

  router.post('/', validateResource(CreateFacultySchema), createFacultyHandler)
  router.get('/', getAllFacultiesHandler)
  router.get('/status', getAllStatusFacultiesHandler)
  router.put(
    '/:id',
    validateResource(UpdateFacultySchema),
    updateFacultyHandler,
  )
  router.delete(
    '/:id',
    validateResource(DeleteFacultySchema),
    deleteFacultyHandler,
  )

  return router
}
