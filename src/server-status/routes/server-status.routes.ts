import { Router } from 'express';
import { deserializeUser, validateResource } from '../../middlewares';
import {
  findAllServerStatusHandler,
  upsertServerStatusHandler,
} from '../controllers';
import { ServerStatusSchema } from '../schemas';

export const serverStatusRoutes = (): Router => {
  const router = Router();

  router.patch(
    '/',
    validateResource(ServerStatusSchema),
    deserializeUser,
    upsertServerStatusHandler,
  );
  router.get('/', deserializeUser, findAllServerStatusHandler);

  return router;
};
