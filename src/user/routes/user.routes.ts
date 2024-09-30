import { Router } from 'express';
import { deserializeUser, validateResource } from '../../middlewares';
import { createUserHandler, getMeHandler } from '../controller';
import { AuthUserSchema } from '../../schemas';

export const userRoutes = (): Router => {
  const router = Router();

  router.post('/', validateResource(AuthUserSchema), createUserHandler);
  router.get('/me', deserializeUser, getMeHandler);

  return router;
};
