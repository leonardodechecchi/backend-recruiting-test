import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { IDogRepository } from '../repositories/DogRepository';
import { Dog } from '../models/Dog';
import { ObjectId } from 'mongodb';

/**
 * Controller che gestisce la richiesta di ottenere un cane dal canile tramite il suo ID.
 *
 * @param dogRepository Il repository dei cani.
 */
class GetDogByIdController extends BaseController {
  private readonly dogRepository: IDogRepository;

  constructor(dogRepository: IDogRepository) {
    super();

    this.dogRepository = dogRepository;
  }

  protected async executeImpl(request: Request, response: Response): Promise<void> {
    const dogId = new ObjectId(request.params.id);
    const dog = await this.dogRepository.getById(dogId);

    if (!dog) {
      return this.notFound(response);
    }

    return this.ok<Dog>(response, dog);
  }
}

export { GetDogByIdController };
