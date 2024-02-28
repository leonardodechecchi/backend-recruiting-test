import { Schema, Types, model } from 'mongoose';

type Dog = {
  name: string;
  breed: string;
  age: number;
  status: 'available' | 'adopted' | 'in-custody';
  adoptionDate?: Date;
  _id?: Types.ObjectId;
};

const dogSchema = new Schema<Dog>(
  {
    name: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    status: {
      type: String,
      enum: ['available', 'adopted', 'in-custody'],
      required: true,
    },
    adoptionDate: { type: Date },
  },
  { versionKey: false }
);

const DogModel = model<Dog>('dogs', dogSchema);

export { Dog, DogModel };
