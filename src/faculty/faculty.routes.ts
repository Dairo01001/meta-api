/**
 * @swagger
 * tags:
 * - name: Faculty
 *   description: Facultad a la que pertenece el usuario
 * /faculties:
 *   post:
 *     summary: Crear una nueva facultad
 *     tags: [Faculty]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFaculty'
 *     responses:
 *       201:
 *         $ref: '#/components/schemas/Faculty'
 *       409:
 *         description: Faculty already exists
 *         $ref: '#/components/responses/Conflict'
 *     security:
 *       - bearerAuth: []
 *
 *   get:
 *     summary: Traer todas las facultades
 *     tags: [Faculty]
 *     responses:
 *       200:
 *         description: Array of faculties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Faculty'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *     security:
 *       - bearerAuth: []
 *
 * /faculties/status:
 *   get:
 *     summary: Traer todas las facultades en estado activo
 *     tags: [Faculty]
 *     responses:
 *       200:
 *         description: Array of faculty status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Faculty'
 *
 * /faculties/{id}:
 *   get:
 *     summary: Traer una facultad por su id, con sus respectivos programas
 *     tags: [Faculty]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Faculty object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Faculty'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *     security:
 *       - bearerAuth: []
 *
 *   put:
 *     summary: Update faculty
 *     tags: [Faculty]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateFaculty'
 *     responses:
 *       200:
 *         description: Updated faculty object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Faculty'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: Faculty not found
 *         $ref: '#/components/responses/NotFound'
 *     security:
 *       - bearerAuth: []
 *
 *   delete:
 *     summary: Delete faculty
 *     tags: [Faculty]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Deleted faculty object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Faculty'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: Faculty not found
 *         $ref: '#/components/responses/NotFound'
 *     security:
 *       - bearerAuth: []
 *
 * components:
 *   schemas:
 *     UpdateFaculty:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *
 *     CreateFaculty:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Facultad de Ingeniería
 *         status:
 *           type: boolean
 *           example: true
 *       required:
 *         - name
 *
 *     Faculty:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         status:
 *           type: boolean
 *
 *
 *   responses:
 *     Conflict:
 *       description: Faculty already exists
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Faculty already exists
 *
 *     NotFound:
 *       description: Faculty not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Faculty not found
 */

import { Router } from 'express'
import { deserializeUser, validateResource } from '../middlewares'
import {
  createFacultyHandler,
  deleteFacultyHandler,
  getAllFacultiesHandler,
  getAllStatusFacultiesHandler,
  getFacultyHandler,
  updateFacultyHandler,
} from './faculty.controller'
import {
  CreateFacultySchema,
  DeleteFacultySchema,
  UpdateFacultySchema,
} from './faculty.schema'

export const facultyRoutes = (): Router => {
  const router = Router()

  router.post(
    '/',
    deserializeUser,
    validateResource(CreateFacultySchema),
    createFacultyHandler,
  )
  router.get('/', deserializeUser, getAllFacultiesHandler)
  router.get('/status', getAllStatusFacultiesHandler)
  router.put(
    '/:id',
    deserializeUser,
    validateResource(UpdateFacultySchema),
    updateFacultyHandler,
  )
  router.delete(
    '/:id',
    deserializeUser,
    validateResource(DeleteFacultySchema),
    deleteFacultyHandler,
  )
  router.get('/:id', deserializeUser, getFacultyHandler)

  return router
}
