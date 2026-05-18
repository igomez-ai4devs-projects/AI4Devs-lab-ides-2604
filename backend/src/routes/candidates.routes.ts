import { Router } from 'express';
import { uploadCv } from '../middlewares/upload.middleware';
import * as candidatesController from '../controllers/candidates.controller';

const router = Router();

/**
 * @openapi
 * /api/candidates:
 *   post:
 *     summary: Crear un nuevo candidato
 *     tags: [Candidates]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *               - address
 *               - educations
 *               - workExperiences
 *               - cv
 *             properties:
 *               firstName:
 *                 type: string
 *                 maxLength: 80
 *               lastName:
 *                 type: string
 *                 maxLength: 80
 *               email:
 *                 type: string
 *                 format: email
 *                 maxLength: 254
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *                 maxLength: 255
 *               educations:
 *                 type: string
 *                 description: Array JSON-encoded con al menos un elemento
 *                 example: '[{"institution":"UPM","degree":"Ing","startDate":"2015-09-01"}]'
 *               workExperiences:
 *                 type: string
 *                 description: Array JSON-encoded (puede estar vacío)
 *                 example: '[]'
 *               cv:
 *                 type: string
 *                 format: binary
 *                 description: CV en PDF o DOCX, máx. 5MB
 *     responses:
 *       201:
 *         description: Candidato creado
 *       400:
 *         description: Datos inválidos o tipo de archivo no permitido
 *       409:
 *         description: Email duplicado
 *       413:
 *         description: Archivo demasiado grande
 *       500:
 *         description: Error interno del servidor
 */
router.post('/candidates', uploadCv.single('cv'), candidatesController.createCandidate);

export default router;
