import { EnvUtil } from './utils/Env';
import { MongoDb } from './utils/MongoDb';
import { Server } from './Server';

const env = new EnvUtil();
const mongoDb = new MongoDb(env);
const server = new Server(env, mongoDb);

server.listen();
