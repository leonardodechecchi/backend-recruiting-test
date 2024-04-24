import { Router } from "express";
import {
  addDogToCustodyController,
  adoptDogController,
  getAllDogsController,
  getDogByIdController,
  getDogStatistics,
  registerDogController,
  releaseDogFromCustodyController,
} from "../controllers";
import { Middleware } from "../utils/Middleware";

const dogRouter = Router();

dogRouter.get("/dogs", (request, response) =>
  getAllDogsController.execute(request, response)
);

dogRouter.get("/dogs/stats", (request, response) =>
  getDogStatistics.execute(request, response)
);

dogRouter.get(
  "/dogs/:id",
  Middleware.checkObjectIdValidity(),
  (request, response) => getDogByIdController.execute(request, response)
);

dogRouter.post(
  "/dogs/new",
  Middleware.checkDogValidity(),
  (request, response) => registerDogController.execute(request, response)
);

dogRouter.put(
  "/dogs/:id/adopt",
  Middleware.checkObjectIdValidity(),
  Middleware.checkAuth(),
  (request, response) => adoptDogController.execute(request, response)
);

dogRouter.post(
  "/dogs/custody",
  Middleware.checkDogValidity(),
  Middleware.checkAuth(),
  (request, response) => addDogToCustodyController.execute(request, response)
);

dogRouter.delete(
  "/dogs/custody/:id",
  Middleware.checkObjectIdValidity(),
  Middleware.checkAuth(),
  (request, response) =>
    releaseDogFromCustodyController.execute(request, response)
);

export { dogRouter };
