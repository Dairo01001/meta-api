import { Application } from 'express'
import swaggerUi from 'swagger-ui-express'
import yaml from 'yamljs'

const swaggerDocument = yaml.load('./src/swagger.yml')

export const swaggerInit = (app: Application) => {
  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}
