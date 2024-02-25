import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { Dog } from '../models/Dog';
import { IDogRepository } from '../repositories/DogRepository';

class AddDogToCustodyController extends BaseController {
  constructor(private dogRepository: IDogRepository) {
    super();
  }

  protected async executeImpl(request: Request, response: Response): Promise<void> {
    const { name, breed, age } = request.body as Dog;

    const dog = new Dog(name, breed, age, 'in-custody');
    await this.dogRepository.insertOne(dog);

    return this.ok(response);
  }
}

export { AddDogToCustodyController };
