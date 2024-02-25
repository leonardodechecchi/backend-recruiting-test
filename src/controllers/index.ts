import { dogRepository } from '../repositories';
import { cacheService } from '../utils';
import { AddDogToCustodyController } from './AddDogToCustodyController';
import { AdoptDogController } from './AdoptDogController';
import { GetAllDogsController } from './GetAllDogsController';
import { GetDogByIdController } from './GetDogByIdController';
import { RegisterDogController } from './RegisterDogController';
import { ReleaseDogFromCustodyController } from './ReleaseDogFromCustodyController';

const getAllDogsController = new GetAllDogsController(dogRepository, cacheService);

const registerDogController = new RegisterDogController(dogRepository);

const getDogByIdController = new GetDogByIdController(dogRepository);

const adoptDogController = new AdoptDogController(dogRepository, cacheService);

const addDogToCustodyController = new AddDogToCustodyController(dogRepository);

const releaseDogFromCustodyController = new ReleaseDogFromCustodyController(
  dogRepository
);

export {
  getAllDogsController,
  registerDogController,
  getDogByIdController,
  adoptDogController,
  addDogToCustodyController,
  releaseDogFromCustodyController,
};
