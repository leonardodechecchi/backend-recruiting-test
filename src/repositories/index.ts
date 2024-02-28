import { DogRepository, IDogRepository } from './DogRepository';
import { IUserRepository, UserRepository } from './UserRepository';

const dogRepository: IDogRepository = new DogRepository();

const userRepository: IUserRepository = new UserRepository();

export { dogRepository, userRepository };
