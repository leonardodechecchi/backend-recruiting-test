import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { IDogRepository } from '../repositories/DogRepository';
import { Dog } from '../models/Dog';
import { ICacheService } from '../utils/CacheService';

class GetAllDogsController extends BaseController {
  constructor(
    private dogRepository: IDogRepository,
    private dogCacheService: ICacheService
  ) {
    super();
  }

  protected async executeImpl(request: Request, response: Response): Promise<void> {
    const key = request.originalUrl;
    const cachedData = this.dogCacheService.get<Dog[]>(key);

    if (cachedData) {
      return this.ok(response, cachedData);
    }

    const dogs = await this.dogRepository.getAll();

    this.dogCacheService.set<Dog[]>(key, dogs);

    this.ok<Dog[]>(response, dogs);
  }
}

export { GetAllDogsController };
