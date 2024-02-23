import { dogRepository } from '../repositories';
import { GetAllDogsController } from './GetAllDogsController';

const getAllDogsController = new GetAllDogsController(dogRepository);

export { getAllDogsController };
