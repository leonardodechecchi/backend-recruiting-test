import mongoose, { Document, Model, Types } from "mongoose";
const Schema = mongoose.Schema;

export const DogSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    breed: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "adopted", "in-custody"],
      required: true,
    },
    adoptionDate: {
      type: Date,
    },
    ownerId: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export interface IDog extends Document {
  _id: Types.ObjectId;
  id: string;
  name: string;
  breed: string;
  age: number;
  status: string;
  adoptionDate: Date;
  ownerId: Types.ObjectId;
  updatedAt: Date | number;
  createdAt: Date | number;
}

const Dog =
  (mongoose.models.Dog as Model<IDog>) ||
  mongoose.model<IDog>("Dog", DogSchema);

export default Dog;
