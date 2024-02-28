import { dogRepository, userRepository } from '../repositories';
import { cacheService } from '../utils';
import { AddDogToCustodyController } from './AddDogToCustodyController';
import { AdoptDogController } from './AdoptDogController';
import { GetAllDogsController } from './GetAllDogsController';
import { GetDogByIdController } from './GetDogByIdController';
import { GetDogStatisticsController } from './GetDogStatisticsController';
import { LoginController } from './LoginController';
import { RegisterController } from './RegisterController';
import { RegisterDogController } from './RegisterDogController';
import { ReleaseDogFromCustodyController } from './ReleaseDogFromCustodyController';

const getAllDogsController = new GetAllDogsController(dogRepository, cacheService);

const getDogByIdController = new GetDogByIdController(dogRepository);

const getDogStatistics = new GetDogStatisticsController(dogRepository);

const registerDogController = new RegisterDogController(dogRepository, cacheService);

const adoptDogController = new AdoptDogController(dogRepository, cacheService);

const addDogToCustodyController = new AddDogToCustodyController(
  dogRepository,
  cacheService
);

const releaseDogFromCustodyController = new ReleaseDogFromCustodyController(
  dogRepository,
  cacheService
);

const loginController = new LoginController(userRepository);

const registerController = new RegisterController(userRepository);

export {
  getAllDogsController,
  getDogByIdController,
  getDogStatistics,
  registerDogController,
  adoptDogController,
  addDogToCustodyController,
  releaseDogFromCustodyController,
  loginController,
  registerController,
};
