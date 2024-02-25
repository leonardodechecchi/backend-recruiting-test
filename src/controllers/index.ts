import { dogRepository } from '../repositories';
import { cacheService } from '../utils';
import { AdoptDogController } from './AdoptDogController';
import { GetAllDogsController } from './GetAllDogsController';
import { GetDogByIdController } from './GetDogByIdController';
import { RegisterDogController } from './RegisterDogController';

const getAllDogsController = new GetAllDogsController(dogRepository, cacheService);

const registerDogController = new RegisterDogController(dogRepository);

const getDogByIdController = new GetDogByIdController(dogRepository);

const adoptDogController = new AdoptDogController(dogRepository, cacheService);

export {
  getAllDogsController,
  registerDogController,
  getDogByIdController,
  adoptDogController,
};
