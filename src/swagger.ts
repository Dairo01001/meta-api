import { Application } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Meta API',
      version: '1.0.0',
      description: 'Uniamazonia 3D API',
    },
    licence: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
    contact: {
      name: 'Uniamazonia',
      url: 'https://uniamazonia.com.br',
      email: 'contato@uniamazonia.com.br',
    },
  },
  servers: [
    {
      url: 'http://localhost:3001',
    },
  ],
  apis: ['./src/**/*.ts'],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

export const swaggerInit = (app: Application) => {
  app.use(
    '/api',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true }),
  )
}
