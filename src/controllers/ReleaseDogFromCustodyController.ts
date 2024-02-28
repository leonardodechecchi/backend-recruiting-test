import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { IDogRepository } from '../repositories/DogRepository';
import { ObjectId } from 'mongodb';
import { ICacheService } from '../utils/CacheService';

class ReleaseDogFromCustodyController extends BaseController {
  private readonly dogRepository: IDogRepository;
  private readonly cacheService: ICacheService;

  constructor(dogRepository: IDogRepository, cacheService: ICacheService) {
    super();

    this.dogRepository = dogRepository;
    this.cacheService = cacheService;
  }

  protected async executeImpl(request: Request, response: Response): Promise<void> {
    const dogId = new ObjectId(request.params.id);
    const dog = await this.dogRepository.getById(dogId);

    if (!dog) {
      return this.notFound(response);
    }

    if (dog.status !== 'in-custody') {
      return this.unauthorized(response);
    }

    await this.dogRepository.deleteOne(dogId);

    this.cacheService.purge();

    return this.ok(response);
  }
}

export { ReleaseDogFromCustodyController };
