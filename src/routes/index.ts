import { Router } from 'express';
import {
  adoptDogController,
  getAllDogsController,
  getDogByIdController,
} from '../controllers';
import { Middleware } from '../utils/Middleware';

const dogRouter = Router();

dogRouter.get('/dogs', (request, response) =>
  getAllDogsController.execute(request, response)
);

dogRouter.get('/dogs/:id', Middleware.checkObjectIdValidity(), (request, response) =>
  getDogByIdController.execute(request, response)
);

dogRouter.put(
  '/dogs/:id/adopt',
  Middleware.checkObjectIdValidity(),
  (request, response) => adoptDogController.execute(request, response)
);

export { dogRouter };
