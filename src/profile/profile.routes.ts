import { Router } from 'express';
import { deserializeUser, validateResource } from '../middlewares';
import { CreateProfileSchema } from './profile.schema';
import { createProfileHandler, updateProfileHandler } from './profile.controller';

export const profileRoutes = (): Router => {
  const router = Router();

  router.post('/', deserializeUser, validateResource(CreateProfileSchema), createProfileHandler);
  router.put('/:id', deserializeUser, validateResource(CreateProfileSchema), updateProfileHandler);

  return router;
};
