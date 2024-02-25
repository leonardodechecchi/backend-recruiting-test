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

    await this.dogRepository.insertOne({ name, breed, age, status: 'in-custody' });

    return this.ok(response);
  }
}

export { AddDogToCustodyController };
