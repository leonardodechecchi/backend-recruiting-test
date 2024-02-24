import { DogRepository, IDogRepository } from './DogRepository';
import { MockDogRepository } from './MockDogRepository';

// const dogRepository: IDogRepository = new DogRepository();

const dogRepository: IDogRepository = new MockDogRepository();

export { dogRepository };
