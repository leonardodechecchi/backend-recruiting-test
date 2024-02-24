import { dogRepository } from '../repositories';
import { GetAllDogsController } from './GetAllDogsController';
import { GetDogByIdController } from './GetDogByIdController';

const getAllDogsController = new GetAllDogsController(dogRepository);

const getDogByIdController = new GetDogByIdController(dogRepository);

export { getAllDogsController, getDogByIdController };
