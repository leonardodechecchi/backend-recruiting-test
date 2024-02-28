import { env } from './Env';
import { MongoDb } from './MongoDb';
import express, { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { dogRouter } from '../routes';
import { authRouter } from '../routes/authRouter';
import { swaggerOptions } from './swagger';

class Server {
  private readonly mongoDb: MongoDb;
  private readonly app: Express;

  constructor(mongoDb: MongoDb) {
    this.mongoDb = mongoDb;

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
    this.app.use('/api', authRouter);

    await this.mongoDb.connect();
  }

  public async listen(): Promise<void> {
    await this.init();

    this.app.listen(env.httpPort, () => {
      console.log(`Server listening on http://localhost:${env.httpPort}`);
      console.log(`Docs available at http://localhost:${env.httpPort}/docs`);
    });
  }
}

export { Server };
