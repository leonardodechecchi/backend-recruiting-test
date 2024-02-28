import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { IDogRepository } from '../repositories/DogRepository';
import { ObjectId } from 'mongodb';
import { ICacheService } from '../utils/CacheService';

/**
 * Controller che gestisce l'adozione di un cane presente nel canile.
 *
 * @param dogRepository Il repository dei cani.
 * @param cacheService Il servizio che gestisce la cache.
 */
class AdoptDogController extends BaseController {
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
