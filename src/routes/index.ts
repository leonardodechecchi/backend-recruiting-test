import { Router } from 'express';
import { getAllDogsController, getDogByIdController } from '../controllers';
import { Middleware } from '../utils/Middleware';

const dogRouter = Router();

dogRouter.get('/dogs', (request, response) =>
  getAllDogsController.execute(request, response)
);

dogRouter.get('/dogs/:id', Middleware.checkObjectIdValidity(), (request, response) =>
  getDogByIdController.execute(request, response)
);

export { dogRouter };
