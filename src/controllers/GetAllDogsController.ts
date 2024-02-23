import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { IDogRepository } from '../repositories/DogRepository';
import { Dog } from '../models/Dog';

class GetAllDogsController extends BaseController {
  constructor(private dogRepository: IDogRepository) {
    super();
  }

  protected async executeImpl(_: Request, response: Response): Promise<void> {
    const dogs = await this.dogRepository.getAll();

    this.ok<Dog[]>(response, dogs);
  }
}

export { GetAllDogsController };
