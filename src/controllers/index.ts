import { dogRepository } from '../repositories';
import { dogCacheService } from '../utils';
import { AddDogToCustodyController } from './AddDogToCustodyController';
import { AdoptDogController } from './AdoptDogController';
import { GetAllDogsController } from './GetAllDogsController';
import { GetDogByIdController } from './GetDogByIdController';
import { GetDogStatisticsController } from './GetDogStatisticsController';
import { RegisterDogController } from './RegisterDogController';
import { ReleaseDogFromCustodyController } from './ReleaseDogFromCustodyController';

const getAllDogsController = new GetAllDogsController(dogRepository, dogCacheService);

const getDogByIdController = new GetDogByIdController(dogRepository);

const getDogStatistics = new GetDogStatisticsController(dogRepository);

const registerDogController = new RegisterDogController(dogRepository, dogCacheService);

const adoptDogController = new AdoptDogController(dogRepository, dogCacheService);

const addDogToCustodyController = new AddDogToCustodyController(dogRepository);

const releaseDogFromCustodyController = new ReleaseDogFromCustodyController(
  dogRepository
);

export {
  getAllDogsController,
  getDogByIdController,
  getDogStatistics,
  registerDogController,
  adoptDogController,
  addDogToCustodyController,
  releaseDogFromCustodyController,
};
