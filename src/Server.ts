import { EnvUtil } from './utils/Env';
import { MongoDb } from './utils/MongoDb';
import express, { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { dogRouter } from './routes';
import { swaggerOptions } from './utils/swagger';

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
    const swaggerSpec = swaggerJsdoc(swaggerOptions);
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.app.get('/docs.json', (_, response) => {
      response.setHeader('Content-Type', 'application/json');
      response.send(swaggerSpec);
    });

    this.app.use(express.json());
    this.app.use('/api', dogRouter);

    await this.mongoDb.connect();
  }

  public async listen(): Promise<void> {
    await this.init();

    this.app.listen(this.env.httpPort, () => {
      console.log(`Server listening on http://localhost:${this.env.httpPort}`);
      console.log(`Docs available at http://localhost:${this.env.httpPort}/docs`);
    });
  }
}

export { Server };
