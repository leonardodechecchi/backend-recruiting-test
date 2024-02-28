import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { IDogRepository } from '../repositories/DogRepository';

class GetDogStatisticsController extends BaseController {
  private readonly dogRepository: IDogRepository;

  constructor(dogRepository: IDogRepository) {
    super();

    this.dogRepository = dogRepository;
  }

  protected async executeImpl(_: Request, response: Response): Promise<void> {
    const result = await this.dogRepository.getStatistics();

    return this.ok(response, result);
  }
}

export { GetDogStatisticsController };
