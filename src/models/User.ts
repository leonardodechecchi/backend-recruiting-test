import { Schema, Types, model } from 'mongoose';

type User = {
  email: string;
  password: string;
  _id?: Types.ObjectId;
};

const userSchema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = model<User>('users', userSchema);

export { User, UserModel };
