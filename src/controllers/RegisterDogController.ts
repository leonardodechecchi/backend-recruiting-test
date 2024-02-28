import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { IDogRepository } from '../repositories/DogRepository';
import { Dog } from '../models/Dog';
import { ICacheService } from '../utils/CacheService';

/**
 * Controller che gestisce la richiesta di registrare un nuovo cane nel canile.
 *
 * @param dogRepository Il repository dei cani.
 * @param cacheService Il servizio che gestisce la cache.
 */
class RegisterDogController extends BaseController {
  private readonly dogRepository: IDogRepository;
  private readonly dogCacheService: ICacheService;

  constructor(dogRepository: IDogRepository, dogCacheService: ICacheService) {
    super();

    this.dogRepository = dogRepository;
    this.dogCacheService = dogCacheService;
  }

  protected async executeImpl(request: Request, response: Response): Promise<void> {
    const { name, breed, age } = request.body as Dog;

    await this.dogRepository.insertOne({
      name,
      breed,
      age,
      status: 'available',
    });

    this.dogCacheService.purge();

    this.ok(response);
  }
}

export { RegisterDogController };
