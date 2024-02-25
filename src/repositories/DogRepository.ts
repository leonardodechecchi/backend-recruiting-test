import { Collection, Db, ObjectId } from 'mongodb';
import { Dog } from '../models/Dog';

interface IDogRepository {
  getAll(): Promise<Dog[]>;
  getById(id: ObjectId): Promise<Dog | null>;
  insertOne(dog: Dog): Promise<void>;
  updateOne(id: ObjectId, dog: Partial<Dog>): Promise<void>;
}

class DogRepository implements IDogRepository {
  private collection: Collection<Dog>;

  constructor(db: Db) {
    this.collection = db.collection('dogs');
  }

  public async getAll(): Promise<Dog[]> {
    return this.collection.find().toArray();
  }

  public async getById(id: ObjectId): Promise<Dog | null> {
    return this.collection.findOne({ _id: id });
  }

  public async insertOne(dog: Dog): Promise<void> {
    await this.collection.insertOne(dog);
  }

  public async updateOne(id: ObjectId, updatedDog: Partial<Dog>): Promise<void> {
    await this.collection.updateOne({ _id: id }, updatedDog);
  }
}

export { DogRepository, IDogRepository };
