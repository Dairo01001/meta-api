import { Application } from 'express';
import { userRoutes } from './user';
import { authRoutes } from './auth';
import { facultyRoutes } from './faculty';
import { programRoutes } from './program';
import { personRoutes } from './person/person.routes';
import { profileRoutes } from './profile/profile.routes';

const routes = (app: Application) => {
  app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
  });

  app.use('/api/users', userRoutes());
  app.use('/api/auth', authRoutes());
  app.use('/api/faculties', facultyRoutes());
  app.use('/api/programs', programRoutes());
  app.use('/api/persons', personRoutes());
  app.use('/api/profiles', profileRoutes());
};

export default routes;
