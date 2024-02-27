import { connection, connect, disconnect } from 'mongoose';
import { EnvUtil } from './Env';

class MongoDb {
  private readonly env: EnvUtil;

  constructor(env: EnvUtil) {
    this.env = env;
  }

  public async connect(): Promise<void> {
    connection.on('connected', () => {
      console.log('Connected to MongoDB');
    });

    connection.on('disconnected', () => {
      console.log('Disconnected from MongoDB');
    });

    connection.on('error', () => {
      console.log('An error occurred during a MongoDB connection');
    });

    await connect(`${this.env.dbConnectionString}/${this.env.dbName}`);
  }

  public async disconnect(): Promise<void> {
    await disconnect();
  }
}

export { MongoDb };
