import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';

type MiddlewareFunction = (
  request: Request,
  response: Response,
  next: NextFunction
) => void;

class Middleware {
  constructor() {}

  public checkObjectIdValidity(): MiddlewareFunction {
    return (request: Request, response: Response, next: NextFunction) => {
      const { id } = request.params;

      if (!ObjectId.isValid(id)) {
        response.status(400).json({ message: 'Invalid id' });
        return;
      }

      next();
    };
  }
}

export { Middleware };
