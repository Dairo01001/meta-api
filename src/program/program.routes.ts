import { Router } from 'express';
import { deserializeUser, validateResource } from '../middlewares';
import { createProgramHandler, getAllProgramsHandler, getProgramHandler } from './program.controller';
import { CreateProgramSchema } from './program.schema';
import { adminAuthorize } from '../middlewares/admin-authorize';

export const programRoutes = (): Router => {
  const router = Router();

  router.post('/', deserializeUser, adminAuthorize, validateResource(CreateProgramSchema), createProgramHandler);
  router.get('/', getAllProgramsHandler);
  router.get('/:id', deserializeUser, adminAuthorize, getProgramHandler);

  return router;
};
