import { dogRepository } from '../repositories';
import { AdoptDogController } from './AdoptDogController';
import { GetAllDogsController } from './GetAllDogsController';
import { GetDogByIdController } from './GetDogByIdController';

const getAllDogsController = new GetAllDogsController(dogRepository);

const getDogByIdController = new GetDogByIdController(dogRepository);

const adoptDogController = new AdoptDogController(dogRepository);

export { getAllDogsController, getDogByIdController, adoptDogController };
