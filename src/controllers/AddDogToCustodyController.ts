import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { Dog } from '../models/Dog';
import { IDogRepository } from '../repositories/DogRepository';

/**
 * Controller che gestisce l'aggiunta di un nuovo cane in custodia nel canile.
 *
 * @param dogRepository Il repository dei cani.
 */
class AddDogToCustodyController extends BaseController {
  private readonly dogRepository: IDogRepository;

  constructor(dogRepository: IDogRepository) {
    super();

    this.dogRepository = dogRepository;
  }

  protected async executeImpl(request: Request, response: Response): Promise<void> {
    const { name, breed, age } = request.body as Dog;

    await this.dogRepository.insertOne({ name, breed, age, status: 'in-custody' });

    return this.ok(response);
  }
}

export { AddDogToCustodyController };
