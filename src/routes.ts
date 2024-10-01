import { Application } from 'express';
import { userRoutes } from './user';
import { authRoutes } from './auth';
import { facultyRoutes } from './faculty';

const routes = (app: Application) => {
  app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
  });

  app.use('/api/users', userRoutes());
  app.use('/api/auth', authRoutes());
  app.use('/api/faculty', facultyRoutes());
};

export default routes;
