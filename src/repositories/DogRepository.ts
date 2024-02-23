import { ObjectId } from 'mongodb';
import { Dog } from '../models/Dog';

interface IDogRepository {
  getAll(): Promise<Dog[]>;
  getById(id: ObjectId): Promise<Dog | null>;
  insertOne(dog: Dog): Promise<void>;
  updateOne(dog: Partial<Dog>): Promise<void>;
}

class DogRepository implements IDogRepository {
  constructor() {}

  public async getAll(): Promise<Dog[]> {
    throw new Error('Method not implemented.');
  }

  public async getById(id: ObjectId): Promise<Dog | null> {
    throw new Error('Method not implemented.');
  }

  public async insertOne(dog: Dog): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async updateOne(dog: Partial<Dog>): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { DogRepository, IDogRepository };
