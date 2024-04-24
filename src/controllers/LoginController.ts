import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { AuthService } from "../services/AuthService";
import User from "../models/User";

class LoginController extends BaseController {
  protected async executeImpl(
    request: Request,
    response: Response
  ): Promise<void> {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!user || !AuthService.comparePasswords(password, user.password)) {
      return this.unauthorized(response, "Credenziali errate");
    }

    const jwt = AuthService.signJWT({ email });

    response.cookie("jwt", jwt, { httpOnly: true });

    return this.ok(response);
  }
}

export { LoginController };
