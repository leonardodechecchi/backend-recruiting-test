import { MongoDb } from './utils/MongoDb';
import { Server } from './utils/Server';

const mongoDb = new MongoDb();
const server = new Server(mongoDb);

server.listen();
