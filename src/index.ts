import { config } from 'dotenv';
import express from 'express';
import http from 'http';
import { MongoClient } from 'mongodb';

const result = config();
if (result.error) {
  process.exit(1);
}

const app = express();
const httpPort = process.env.HTTP_PORT!;

app.use(express.json());

const dbClient = new MongoClient(process.env.DB_CONN_STRING as string);

async function run() {
  try {
    await dbClient.connect();
  } finally {
    await dbClient.close();
  }
}

run().then(() => {
  const httpServer = http.createServer(app);

  httpServer.listen(httpPort, () => {
    console.log(`Server listening on http://localhost:${httpPort}/`);
  });
});
