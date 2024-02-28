import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { Dog } from '../models/Dog';
import { IDogRepository } from '../repositories/DogRepository';
import { ICacheService } from '../utils/CacheService';

/**
 * Controller che gestisce l'aggiunta di un nuovo cane in custodia nel canile.
 *
 * @param dogRepository Il repository dei cani.
 * @param cacheService Il servizio che gestisce la cache.
 */
class AddDogToCustodyController extends BaseController {
  private readonly dogRepository: IDogRepository;
  private readonly cacheService: ICacheService;

  constructor(dogRepository: IDogRepository, cacheService: ICacheService) {
    super();

    this.dogRepository = dogRepository;
    this.cacheService = cacheService;
  }

  protected async executeImpl(request: Request, response: Response): Promise<void> {
    const { name, breed, age } = request.body as Dog;

    await this.dogRepository.insertOne({ name, breed, age, status: 'in-custody' });

    this.cacheService.purge();

    return this.ok(response);
  }
}

export { AddDogToCustodyController };
