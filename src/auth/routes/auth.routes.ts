/**
 * @swagger
 * tags:
 * - name: Auth
 *   description: Auth API
 * /auth/signin:
 *   post:
 *     summary: Autentificación de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthUser'
 *     responses:
 *       200:
 *         description: User token
 *         $ref: '#/components/responses/LoginSuccess'
 *       401:
 *         description: Invalid credentials
 *         $ref: '#/components/responses/Unauthorized'
 *
 * components:
 *   responses:
 *     LoginSuccess:
 *       description: Login Success
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
 *               accessToken:
 *                 type: string
 *               refreshToken:
 *                 type: string
 *     Unauthorized:
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Invalid token or session has expired
 *   schemas:
 *     AuthUser:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: d.garcia
 *         password:
 *           type: string
 *           example: Garcia123!
 *       required:
 *         - username
 *         - password
 */

import { Router } from 'express'
import { validateResource } from '../../middlewares'
import { AuthUserSchema } from '../../schemas'
import { authSignInHandler } from '../controller'

export const authRoutes = () => {
  const router = Router()

  router.post('/signin', validateResource(AuthUserSchema), authSignInHandler)

  return router
}
