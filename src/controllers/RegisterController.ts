import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import User from "./../models/User";

class RegisterController extends BaseController {
  protected async executeImpl(
    request: Request,
    response: Response
  ): Promise<void> {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (user) {
      return this.conflict(response, "Email address already taken");
    }

    await User.create(new User({ email, password }));

    this.ok(response);
  }
}

export { RegisterController };
