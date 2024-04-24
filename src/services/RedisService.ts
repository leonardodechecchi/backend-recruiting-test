import { RedisClientType, createClient } from "redis";
import { ICacheService } from "../utils/CacheService";

class RedisService implements ICacheService {
  private readonly redisClient: RedisClientType;

  constructor() {
    this.redisClient = createClient();

    this.redisClient.on("connect", () => {
      console.log("Redis connection established");
    });

    this.redisClient.on("error", (error) => {
      console.log("Redis error:", error);
    });

    this.redisClient.connect();
  }

  public async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  public async set(
    key: string,
    data: string,
    duration: number | undefined = 60 * 60 // 1 hour
  ): Promise<void> {
    this.redisClient.set(key, data);
  }

  public async purge(): Promise<void> {
    await this.redisClient.flushAll();
  }
}

export { RedisService };
