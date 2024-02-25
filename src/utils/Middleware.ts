import { RequestHandler } from 'express';
import { ObjectId } from 'mongodb';
import { Dog } from '../models/Dog';

class Middleware {
  constructor() {}

  public static checkObjectIdValidity(): RequestHandler {
    return (request, response, next) => {
      if (
        !(
          request.params &&
          request.params.id &&
          typeof request.params.id === 'string' &&
          ObjectId.isValid(request.params.id)
        )
      ) {
        return response.status(400).json({ message: 'Invalid id' });
      }

      return next();
    };
  }

  public static checkDogValidity(): RequestHandler {
    return (request, response, next) => {
      const dog = request.body as Dog;

      if (
        !dog ||
        typeof dog.name !== 'string' ||
        typeof dog.breed !== 'string' ||
        typeof dog.age !== 'number'
      ) {
        return response.status(400).json({ message: 'Invalid dog data' });
      }

      return next();
    };
  }
}

export { Middleware };
