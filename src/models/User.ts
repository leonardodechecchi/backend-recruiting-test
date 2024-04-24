import mongoose, { Document, Model, Types } from "mongoose";
import { IDog } from "./Dog";

const Schema = mongoose.Schema;

export const UserSchema = new Schema(
  {
    email: {
      required: true,
      unique: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    dogIds: {
      type: [Types.ObjectId],
      ref: "Dog",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export interface IUser extends Document {
  _id: Types.ObjectId;
  id: string;
  email: string;
  password: string;
  dogIds: Types.ObjectId[];
  updatedAt: Date | number;
  createdAt: Date | number;
  isOwner: (dog: IDog) => boolean;
}

const User =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);

export default User;
