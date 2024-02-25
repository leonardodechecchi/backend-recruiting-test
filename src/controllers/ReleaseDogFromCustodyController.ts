import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { IDogRepository } from '../repositories/DogRepository';
import { ObjectId } from 'mongodb';

class ReleaseDogFromCustodyController extends BaseController {
  constructor(private dogRepository: IDogRepository) {
    super();
  }

  protected async executeImpl(request: Request, response: Response): Promise<void> {
    const dogId = new ObjectId(request.params.id);
    const dog = await this.dogRepository.getById(dogId);

    if (!dog) {
      return this.notFound(response);
    }

    await this.dogRepository.deleteOne(dogId);

    return this.ok(response);
  }
}

export { ReleaseDogFromCustodyController };
