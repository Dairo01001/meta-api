import { Router } from 'express';
import { deserializeUser, validateResource } from '../middlewares';
import { CreateProfileSchema } from './profile.schema';
import { createProfileHandler } from './profile.controller';

export const profileRoutes = (): Router => {
  const router = Router();

  router.post('/', deserializeUser, validateResource(CreateProfileSchema), createProfileHandler);

  return router;
};
