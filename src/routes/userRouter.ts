import { Router } from "express";
import { Middleware } from "../utils/Middleware";
import { getAllUsersController } from "../controllers";

const userRouter = Router();

userRouter.get("/users", Middleware.checkAuth(), (request, response) =>
  getAllUsersController.execute(request, response)
);

export { userRouter };
