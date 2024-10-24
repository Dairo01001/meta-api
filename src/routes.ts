import { Application } from 'express';
import { authRoutes } from './auth';
import { facultyRoutes } from './faculty';
import { personRoutes } from './person/person.routes';
import { profileRoutes } from './profile/profile.routes';
import { programRoutes } from './program';
import { serverStatusRoutes } from './server-status';
import { userRoutes } from './user';

const routes = (app: Application) => {
  app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
  });

  app.use('/users', userRoutes());
  app.use('/auth', authRoutes());
  app.use('/faculties', facultyRoutes());
  app.use('/programs', programRoutes());
  app.use('/persons', personRoutes());
  app.use('/profiles', profileRoutes());
  app.use('/server-status', serverStatusRoutes());
};

export default routes;
