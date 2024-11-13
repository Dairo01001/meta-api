import cors from 'cors'
import 'dotenv/config'
import express, { Application } from 'express'
import morgan from 'morgan'
import { ORIGIN, PORT } from './config'
import { globalErrorHandler, unkanowEndpoint } from './middlewares'
import routes from './routes'
import { swaggerInit } from './swagger'

const createApp = () => {
  const app: Application = express()
  app.set('port', PORT)
  app.disable('x-powered-by')
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(morgan('dev'))
  swaggerInit(app)

  app.use(
    cors({
      origin: ORIGIN,
      credentials: true,
    }),
  )
  routes(app)

  app.use(globalErrorHandler)
  app.use(unkanowEndpoint)

  return app
}

export default createApp
