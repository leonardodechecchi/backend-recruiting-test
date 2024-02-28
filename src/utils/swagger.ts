import { Options } from 'swagger-jsdoc';
import { version } from '../../package.json';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Canile Virtuale',
      version,
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        Dog: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            breed: { type: 'string' },
            age: { type: 'number' },
            status: { type: 'string' },
          },
          required: ['name', 'breed', 'age'],
        },
      },
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [`./src/routes/*.ts`],
};

export { swaggerOptions };
