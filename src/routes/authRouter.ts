import { Router, response } from 'express';
import { loginController, registerController } from '../controllers';

const authRouter = Router();

/**
 * @swagger
 * '/api/dogs/new':
 *   post:
 *     tags:
 *       - User
 *     summary: Effettua il login di un utente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: "test@test.com"
 *               password:
 *                 type: string
 *                 default: test123
 *     responses:
 *       200:
 *         description: Login effettuato con successo
 *       401:
 *         description: Credenziali errate
 */
authRouter.post('/login', (request, response) =>
  loginController.execute(request, response)
);

authRouter.post('/register', (request, response) =>
  registerController.execute(request, response)
);

export { authRouter };
