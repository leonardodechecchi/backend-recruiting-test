import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { IDogRepository } from '../repositories/DogRepository';
import { ObjectId } from 'mongodb';
import { ICacheService } from '../utils/CacheService';

class AdoptDogController extends BaseController {
  constructor(
    private dogRepository: IDogRepository,
    private cacheService: ICacheService
  ) {
    super();
  }

  protected async executeImpl(request: Request, response: Response): Promise<void> {
    const dogId = new ObjectId(request.params.id);
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

    this.cacheService.purge();

    return this.ok(response);
  }
}

export { AdoptDogController };
