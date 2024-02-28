import { RequestHandler } from 'express';
import { ObjectId } from 'mongodb';
import { Dog } from '../models/Dog';

class Middleware {
  constructor() {}

  public static checkObjectIdValidity(): RequestHandler {
    return (request, response, next) => {
      const { params } = request;

      if (
        !params ||
        !params.id ||
        typeof params.id !== 'string' ||
        !ObjectId.isValid(params.id)
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
        typeof dog.age !== 'number' ||
        dog.age < 0
      ) {
        return response.status(400).json({ message: 'Invalid dog data' });
      }

      return next();
    };
  }

  public static checkAuth(): RequestHandler {
    return (request, response, next) => {
      const { authorization } = request.headers;

      if (!authorization) {
        return response.status(401).json({ message: 'Authorization header is missing' });
      }

      const [, jwt] = authorization.split(' ');

      if (!jwt) {
        return response.json(401).json({ message: 'JWT not provided' });
      }

      return next();
    };
  }
}

export { Middleware };
