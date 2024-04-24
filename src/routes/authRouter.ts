import { Router } from "express";
import { loginController, registerController } from "../controllers";

const authRouter = Router();

authRouter.post("/login", (request, response) =>
  loginController.execute(request, response)
);

authRouter.post("/register", (request, response) =>
  registerController.execute(request, response)
);

export { authRouter };
