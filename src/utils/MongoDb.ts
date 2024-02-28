import { env } from './Env';
import { connection, connect, disconnect } from 'mongoose';

class MongoDb {
  constructor() {}

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

    await connect(`${env.dbConnectionString}/${env.dbName}`);
  }

  public async disconnect(): Promise<void> {
    await disconnect();
  }
}

export { MongoDb };
