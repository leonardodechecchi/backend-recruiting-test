import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { IDogRepository } from '../repositories/DogRepository';
import { Dog } from '../models/Dog';
import { ICacheService } from '../utils/CacheService';

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
