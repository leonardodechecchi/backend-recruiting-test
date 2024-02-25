import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { IDogRepository } from '../repositories/DogRepository';
import { Dog } from '../models/Dog';

class RegisterDogController extends BaseController {
  constructor(private dogRepository: IDogRepository) {
    super();
  }

  protected async executeImpl(request: Request, response: Response): Promise<void> {
    const { name, breed, age } = request.body as Dog;

    await this.dogRepository.insertOne({
      name,
      breed,
      age,
      status: 'available',
    });

    this.ok(response);
  }
}

export { RegisterDogController };
