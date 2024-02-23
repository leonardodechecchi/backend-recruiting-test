import { ObjectId } from 'mongodb';
import { DogDTO } from '../dtos/DogDTO';

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

  public toDTO(): DogDTO {
    return {
      name: this.name,
      breed: this.breed,
      age: this.age,
      status: this.status,
      adoptionDate: this.adoptionDate,
    };
  }
}

export { Dog, DogStatus };
