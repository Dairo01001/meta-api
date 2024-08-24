import { Router } from 'express';
import { authSignInHandler } from '../controller';
import { validateResource } from '../../middlewares';
import { AuthUserSchema } from '../../schemas';

export const authRoutes = () => {
  const router = Router();

  router.post('/signin', validateResource(AuthUserSchema), authSignInHandler);

  return router;
};
