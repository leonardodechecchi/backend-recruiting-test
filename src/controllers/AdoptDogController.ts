import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { IDogRepository } from '../repositories/DogRepository';
import { ObjectId } from 'mongodb';

class AdoptDogController extends BaseController {
  constructor(private dogRepository: IDogRepository) {
    super();
  }

  protected async executeImpl(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    await this.dogRepository.updateOne(new ObjectId(id), { status: 'adopted' });

    this.ok(response);
  }
}

export { AdoptDogController };
