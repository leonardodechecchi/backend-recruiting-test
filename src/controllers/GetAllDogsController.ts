import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { IDogRepository } from '../repositories/DogRepository';
import { Dog } from '../models/Dog';
import { ICacheService } from '../utils/CacheService';

/**
 * Controller che gestisce la richiesta di ottenere la lista di tutti i cani presenti nel canile.
 * Prima di recuperare i dati dal repository vengono cercati i dati nella cache.
 *
 * @param dogRepository Il repository dei cani.
 * @param cacheService Il servizio che gestisce la cache.
 */
class GetAllDogsController extends BaseController {
  private readonly dogRepository: IDogRepository;
  private readonly cacheService: ICacheService;

  constructor(dogRepository: IDogRepository, cacheService: ICacheService) {
    super();

    this.dogRepository = dogRepository;
    this.cacheService = cacheService;
  }

  protected async executeImpl(request: Request, response: Response): Promise<void> {
    const key = request.originalUrl;
    const cachedData = this.cacheService.get<Dog[]>(key);

    if (cachedData) {
      return this.ok(response, cachedData);
    }

    const dogs = await this.dogRepository.getAll();

    this.cacheService.set<Dog[]>(key, dogs);

    this.ok<Dog[]>(response, dogs);
  }
}

export { GetAllDogsController };
