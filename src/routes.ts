import { Application } from 'express'
import { authRoutes } from './auth'
import { facultyRoutes } from './faculty'
import { personRoutes } from './person/person.routes'
import { profileRoutes } from './profile/profile.routes'
import { programRoutes } from './program'
import { roleRoutes } from './role'
import { serverRoutes } from './server'
import { serverStatusRoutes } from './server-status'
import { userRoutes } from './user'
import { userStatusRoutes } from './user-status/user-status.routes'

const routes = (app: Application) => {
  app.get('/', (req, res) => {
    res.status(200).send('Hello World!')
  })

  app.use('/users', userRoutes())
  app.use('/auth', authRoutes())
  app.use('/faculties', facultyRoutes())
  app.use('/programs', programRoutes())
  app.use('/persons', personRoutes())
  app.use('/profiles', profileRoutes())
  app.use('/server-status', serverStatusRoutes())
  app.use('/roles', roleRoutes())
  app.use('/user-status', userStatusRoutes())
  app.use('/servers', serverRoutes())
}

export default routes
