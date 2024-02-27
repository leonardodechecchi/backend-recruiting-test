import { EnvUtil } from './utils/Env';
import { MongoDb } from './utils/MongoDb';
import express, { Express } from 'express';
import { dogRouter } from './routes';

class Server {
  private readonly mongoDb: MongoDb;
  private readonly env: EnvUtil;
  private readonly app: Express;

  constructor(env: EnvUtil, mongoDb: MongoDb) {
    this.mongoDb = mongoDb;
    this.env = env;

    this.app = express();
  }

  private async init(): Promise<void> {
    this.app.use(express.json());
    this.app.use('/api', dogRouter);

    await this.mongoDb.connect();
  }

  public async listen(): Promise<void> {
    await this.init();

    this.app.listen(this.env.httpPort, () => {
      console.log(`Server listening on http://localhost:${this.env.httpPort}`);
    });
  }
}

export { Server };
