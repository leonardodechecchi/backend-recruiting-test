import { dogRepository } from '../repositories';
import { cacheService } from '../utils';
import { AdoptDogController } from './AdoptDogController';
import { GetAllDogsController } from './GetAllDogsController';
import { GetDogByIdController } from './GetDogByIdController';

const getAllDogsController = new GetAllDogsController(dogRepository, cacheService);

const getDogByIdController = new GetDogByIdController(dogRepository);

const adoptDogController = new AdoptDogController(dogRepository, cacheService);

export { getAllDogsController, getDogByIdController, adoptDogController };
