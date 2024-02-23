import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { DogRepository } from '../repositories/DogRepository';
import { Dog } from '../models/Dog';
import { ObjectId } from 'mongodb';

class GetDogByIdController extends BaseController {
  constructor(private dogRepository: DogRepository) {
    super();
  }

  protected async executeImpl(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    if (!ObjectId.isValid(id)) {
      this.badRequest(response, 'Invalid id');
      return;
    }

    const dog = await this.dogRepository.getById(new ObjectId(id));

    if (!dog) {
      this.notFound(response);
      return;
    }

    this.ok<Dog>(response, dog);
  }
}

export { GetDogByIdController };
