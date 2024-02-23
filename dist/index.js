"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongodb_1 = require("mongodb");
const result = (0, dotenv_1.config)();
if (result.error) {
    process.exit(1);
}
const app = (0, express_1.default)();
const httpPort = process.env.HTTP_PORT;
app.use(express_1.default.json());
const dbClient = new mongodb_1.MongoClient(process.env.DB_CONN_STRING);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield dbClient.connect();
            console.log('Connected successfully to the server');
            const db = dbClient.db(process.env.DB_NAME);
            const collection = db.collection('dogs');
            // do other stuff ...
        }
        finally {
            yield dbClient.close();
        }
    });
}
run().then(() => {
    const httpServer = http_1.default.createServer(app);
    httpServer.listen(httpPort, () => {
        console.log(`Server listening on http://localhost:${httpPort}/`);
    });
});
