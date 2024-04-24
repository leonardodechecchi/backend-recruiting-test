import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import User from "../models/User";

class GetAllUsersController extends BaseController {
  constructor() {
    super();
  }

  protected async executeImpl(_: Request, response: Response): Promise<void> {
    const users = await User.find().populate({
      path: "dogs",
      select: "name age breed status",
    });

    this.ok(response, users);
  }
}

export { GetAllUsersController };
