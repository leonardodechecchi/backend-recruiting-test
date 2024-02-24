import { IDogRepository } from './DogRepository';
import { MockDogRepository } from './MockDogRepository';

const dogRepository: IDogRepository = new MockDogRepository();

export { dogRepository };
