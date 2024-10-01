import { Router } from 'express';
import { validateResource } from '../middlewares';
import { CreateFacultySchema, DeleteFacultySchema, UpdateFacultySchema } from './faculty.schema';
import {
  createFacultyHandler,
  deleteFacultyHandler,
  getAllFacultiesHandler,
  updateFacultyHandler,
} from './faculty.controller';

export const facultyRoutes = (): Router => {
  const router = Router();

  router.post('/', validateResource(CreateFacultySchema), createFacultyHandler);
  router.get('/', getAllFacultiesHandler);
  router.put('/:id', validateResource(UpdateFacultySchema), updateFacultyHandler);
  router.delete('/:id', validateResource(DeleteFacultySchema), deleteFacultyHandler);

  return router;
};
