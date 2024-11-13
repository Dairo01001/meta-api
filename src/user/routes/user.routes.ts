/**
 * @swagger
 * tags:
 * - name: Users
 *   description: Usuarios resgistrados en el sistema
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/User'
 *       409:
 *         description: Username already exists
 *         $ref: '#/components/responses/Conflict'
 *
 * /users/me:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Traer el usuario actual
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *
 * components:
 *   responses:
 *     Conflict:
 *       description: Username already exists
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Username already exists
 *
 *     User:
 *       description: User object
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               username:
 *                 type: string
 *               role:
 *                 type: string
 *               status:
 *                 type: string
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         role:
 *           type: string
 *         status:
 *           type: string
 *
 *     CreateUser:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: d.garcia
 *         password:
 *           type: string
 *           example: Garcia123!
 *         role:
 *           type: string
 *           example: USER
 *         status:
 *           type: string
 *           example: ACTIVE
 *       required:
 *         - username
 *         - password
 * security:
 * - bearerAuth: []
 */

import { Router } from 'express'
import { deserializeUser, validateResource } from '../../middlewares'
import { AuthUserSchema } from '../../schemas'
import { createUserHandler, getMeHandler } from '../controller'

export const userRoutes = (): Router => {
  const router = Router()

  router.post('/', validateResource(AuthUserSchema), createUserHandler)
  router.get('/me', deserializeUser, getMeHandler)

  return router
}
