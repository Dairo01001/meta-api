import { Router } from 'express';
import { deserializeUser, validateResource } from '../middlewares';
import { CreatePersonSchema } from './person.schema';
import { createPersonHandler, updatePersonHandler } from './person.controller';

export const personRoutes = (): Router => {
  const router = Router();

  router.post('/', deserializeUser, validateResource(CreatePersonSchema), createPersonHandler);
  router.put('/:id', deserializeUser, validateResource(CreatePersonSchema), updatePersonHandler);

  return router;
};
