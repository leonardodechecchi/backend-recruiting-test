import { RequestHandler } from "express";
import { ObjectId } from "mongodb";
import { IDog } from "../models/Dog";
import { AuthService } from "../services/AuthService";
import User from "../models/User";

class Middleware {
  constructor() {}

  public static checkObjectIdValidity(): RequestHandler {
    return (request, response, next) => {
      const { params } = request;

      if (
        !params ||
        !params.id ||
        typeof params.id !== "string" ||
        !ObjectId.isValid(params.id)
      ) {
        return response.status(400).json({ message: "Invalid id" });
      }

      return next();
    };
  }

  public static checkDogValidity(): RequestHandler {
    return (request, response, next) => {
      const dog = request.body as IDog;

      if (
        !dog ||
        typeof dog.name !== "string" ||
        typeof dog.breed !== "string" ||
        typeof dog.age !== "number" ||
        dog.age < 0
      ) {
        return response.status(400).json({ message: "Invalid dog data" });
      }

      return next();
    };
  }

  public static checkAuth(): RequestHandler {
    return async (request, response, next) => {
      const { jwt } = request.cookies;

      if (!jwt) {
        return response.status(401).json({ message: "JWT not provided" });
      }

      try {
        const decodedToken = AuthService.verifyJWT(jwt);

        const user = await User.findOne({ email: decodedToken.email });

        if (user) {
          request.user = user;
        } else {
          return response.status(401).json({ message: "User not found" });
        }
      } catch (error) {
        return response.status(401).json({ message: "Invalid token" });
      }

      return next();
    };
  }
}

export { Middleware };
