import { Router } from 'express';
import { validateResource } from '../../middlewares';
import { AuthUserSchema } from '../../schemas';
import { authSignInHandler } from '../controller';

export const authRoutes = () => {
  const router = Router();

  router.post('/signin', validateResource(AuthUserSchema), authSignInHandler);

  return router;
};
