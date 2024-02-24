import { ObjectId } from 'mongodb';
import { Dog } from '../models/Dog';
import { IDogRepository } from './DogRepository';

class MockDogRepository implements IDogRepository {
  private dogs: Dog[];

  constructor() {
    this.dogs = [
      {
        id: new ObjectId(),
        name: 'Oliver',
        breed: 'West Highland White Terrier',
        age: 17,
        status: 'available',
        adoptionDate: new Date(),
      },
      {
        id: new ObjectId(),
        name: 'Chomsky',
        breed: 'Maltipoo',
        age: 2,
        status: 'adopted',
        adoptionDate: new Date(),
      },
    ];
  }

  public async getAll(): Promise<Dog[]> {
    return this.dogs;
  }

  public async getById(id: ObjectId): Promise<Dog | null> {
    const dog = this.dogs.find((dog) => dog.id?.equals(id));
    return dog ? dog : null;
  }

  public async insertOne(dog: Dog): Promise<void> {
    this.dogs.push(dog);
  }

  public async updateOne(id: ObjectId, updatedDog: Partial<Dog>): Promise<void> {
    const index = this.dogs.findIndex((dog) => dog.id?.equals(id));

    if (index !== -1) {
      this.dogs[index] = { ...this.dogs[index], ...updatedDog };
    }
  }
}

export { MockDogRepository };
