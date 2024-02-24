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

    const dogId = new ObjectId(id);
    const dog = await this.dogRepository.getById(dogId);

    if (!dog) {
      return this.notFound(response);
    }

    if (dog.status === 'adopted') {
      return this.unauthorized(response, 'The dog has already been adopted');
    }

    await this.dogRepository.updateOne(dogId, {
      status: 'adopted',
      adoptionDate: new Date(),
    });

    return this.ok(response);
  }
}

export { AdoptDogController };
