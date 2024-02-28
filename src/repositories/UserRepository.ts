import { User, UserModel } from '../models/User';

interface IUserRepository {
  getByEmail(email: string): Promise<User | null>;
  insertOne(user: User): Promise<void>;
}

class UserRepository implements IUserRepository {
  private readonly model = UserModel;

  public async getByEmail(email: string): Promise<User | null> {
    return this.model.findOne({ email });
  }

  public async insertOne(user: User): Promise<void> {
    await this.model.create(user);
  }
}

export { IUserRepository, UserRepository };
