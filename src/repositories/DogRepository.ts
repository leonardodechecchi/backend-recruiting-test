import { Dog, DogModel } from '../models/Dog';
import { Types } from 'mongoose';

interface IDogRepository {
  getAll(): Promise<Dog[]>;
  getById(id: Types.ObjectId): Promise<Dog | null>;
  getStatistics(): Promise<any[]>;
  insertOne(dog: Dog): Promise<void>;
  updateOne(id: Types.ObjectId, dog: Partial<Dog>): Promise<void>;
  deleteOne(id: Types.ObjectId): Promise<void>;
}

class DogRepository implements IDogRepository {
  private readonly model = DogModel;

  constructor() {}

  public async getAll(): Promise<Dog[]> {
    return this.model.find().lean();
  }

  public async getById(id: Types.ObjectId): Promise<Dog | null> {
    return this.model.findOne({ _id: id }).lean() ?? null;
  }

  public async getStatistics(): Promise<any[]> {
    return this.model.aggregate<{ _id: string; count: number }[]>([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
  }

  public async insertOne(dog: Dog): Promise<void> {
    await this.model.create(dog);
  }

  public async updateOne(id: Types.ObjectId, updatedDog: Partial<Dog>): Promise<void> {
    await this.model.updateOne({ _id: id }, updatedDog);
  }

  public async deleteOne(id: Types.ObjectId): Promise<void> {
    await this.model.findOneAndDelete({ _id: id });
  }
}

export { DogRepository, IDogRepository };
