import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Dog } from '../models/Dog';

class Middleware {
  constructor() {}

  public static checkObjectIdValidity(): RequestHandler {
    return (request: Request, response: Response, next: NextFunction) => {
      if (
        !(
          request.params &&
          request.params.id &&
          typeof request.params.id === 'string' &&
          ObjectId.isValid(request.params.id)
        )
      ) {
        response.status(400).json({ message: 'Invalid id' });
        return;
      }

      next();
    };
  }

  public static checkDogValidity(): RequestHandler {
    return (request: Request, response: Response, next: NextFunction) => {
      const dog = request.body as Dog;

      if (
        !dog ||
        typeof dog.name !== 'string' ||
        typeof dog.breed !== 'string' ||
        typeof dog.age !== 'number' ||
        typeof dog.status !== 'string' ||
        !['available', 'adopted', 'in-custody'].includes(dog.status) ||
        !(dog.adoptionDate instanceof Date)
      ) {
        response.status(400).json({ message: 'Invalid dog data' });
        return;
      }

      next();
    };
  }
}

export { Middleware };
