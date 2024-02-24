import { ObjectId } from 'mongodb';

class Dog {
  constructor(
    public name: string,
    public breed: string,
    public age: number,
    public status: 'available' | 'adopted' | 'in-custody' = 'available',
    public adoptionDate?: Date,
    public id?: ObjectId
  ) {}
}

export { Dog };
