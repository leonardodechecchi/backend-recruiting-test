import { ObjectId } from 'mongodb';

type DogStatus = 'available' | 'adopted' | 'in-custody';

class Dog {
  constructor(
    public name: string,
    public breed: string,
    public age: number,
    public status: DogStatus,
    public adoptionDate: Date,
    public id?: ObjectId
  ) {}
}

export { Dog, DogStatus };
