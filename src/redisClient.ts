import { createClient } from "redis";

const redisClient = createClient();

redisClient.on("connect", () => console.log("Redis connection established"));
redisClient.on("error", (error) => console.log("Redis error", error));

async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

async function disconnectRedis() {
  await redisClient.disconnect();
}

export { redisClient, connectRedis, disconnectRedis };

// class Redis {
//   private readonly redisClient: RedisClientType;

//   constructor() {
//     this.redisClient = createClient();
//   }

//   public async get(key: string) {
//     if (!this.redisClient.isOpen) {
//       await this.redisClient.connect();
//     }

//     return this.redisClient.get(key);
//   }

//   public async set(key: string, data: any) {
//     if (!this.redisClient.isOpen) {
//       await this.redisClient.connect();
//     }

//     this.redisClient.set(key, data)
//   }
// }
