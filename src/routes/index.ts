import { Router } from 'express';
import {
  addDogToCustodyController,
  adoptDogController,
  getAllDogsController,
  getDogByIdController,
  getDogStatistics,
  registerDogController,
  releaseDogFromCustodyController,
} from '../controllers';
import { Middleware } from '../utils/Middleware';

const dogRouter = Router();

/**
 * @swagger
 * '/api/dogs':
 *   get:
 *     tags:
 *       - Dog
 *     summary: Ottiene la lista dei cani nel canile
 *     responses:
 *       200:
 *         description: Lista dei cani ottenuta con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dog'
 */
dogRouter.get('/dogs', (request, response) =>
  getAllDogsController.execute(request, response)
);

/**
 * @swagger
 * '/api/dogs/stats':
 *   get:
 *     tags:
 *       - Dog
 *     summary: Ottiene le statistiche giornaliere dei cani nel canile
 *     responses:
 *       200:
 *         description: Statistiche ottenute con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 count:
 *                   type: integer
 */
dogRouter.get('/dogs/stats', (request, response) =>
  getDogStatistics.execute(request, response)
);

/**
 * @swagger
 * '/api/dogs/{dogId}':
 *   get:
 *     tags:
 *       - Dog
 *     summary: Ottiene il cane con l'id specificato
 *     parameters:
 *       - name: dogId
 *         in: path
 *         description: ID del cane
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cane trovato con successo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dog'
 *       404:
 *         description: Il cane non è stato trovato
 *       400:
 *         description: dogId non valido
 */
dogRouter.get('/dogs/:id', Middleware.checkObjectIdValidity(), (request, response) =>
  getDogByIdController.execute(request, response)
);

/**
 * @swagger
 * '/api/dogs/new':
 *   post:
 *     tags:
 *       - Dog
 *     summary: Registra un nuovo cane nel canile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 default: Cupcake
 *               breed:
 *                 type: string
 *                 default: Pitbull
 *               age:
 *                 type: integer
 *                 default: 5
 *     responses:
 *       200:
 *         description: Cane registrato con successo
 *       400:
 *         description: Il corpo della richiesta contiene dati non validi
 */
dogRouter.post('/dogs/new', Middleware.checkDogValidity(), (request, response) =>
  registerDogController.execute(request, response)
);

/**
 * @swagger
 * '/api/dogs/{dogId}/adopt':
 *   put:
 *     tags:
 *       - Dog
 *     summary: Adotta un cane del canile con l'id specificato
 *     parameters:
 *       - name: dogId
 *         in: path
 *         description: ID del cane
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Il cane è stato adottato con successo
 *       400:
 *         description: dogId non valido
 *       401:
 *         description: Il cane è già stato adottato
 *       404:
 *         description: Il cane non è stato trovato
 */
dogRouter.put(
  '/dogs/:id/adopt',
  Middleware.checkObjectIdValidity(),
  (request, response) => adoptDogController.execute(request, response)
);

/**
 * @swagger
 * '/api/dogs/custody':
 *   post:
 *     tags:
 *       - Dog
 *     summary: Registra un nuovo cane in custodia nel canile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 default: Cupcake
 *               breed:
 *                 type: string
 *                 default: Pitbull
 *               age:
 *                 type: integer
 *                 default: 5
 *     responses:
 *       200:
 *         description: Cane registrato con successo
 *       400:
 *         description: Il corpo della richiesta contiene dati non validi
 */
dogRouter.post('/dogs/custody', Middleware.checkDogValidity(), (request, response) =>
  addDogToCustodyController.execute(request, response)
);

/**
 * @swagger
 * '/api/dogs/custody/{dogId}':
 *   delete:
 *     tags:
 *       - Dog
 *     summary: Rimuove un cane dalla custodia dal canile con l'id specificato
 *     parameters:
 *       - name: dogId
 *         in: path
 *         description: ID del cane
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Il cane è stato rilasciato dalla custodia con successo
 *       400:
 *         description: dogId non valido
 *       404:
 *         description: Il cane non è stato trovato
 */
dogRouter.delete(
  '/dogs/custody/:id',
  Middleware.checkObjectIdValidity(),
  (request, response) => releaseDogFromCustodyController.execute(request, response)
);

export { dogRouter };
