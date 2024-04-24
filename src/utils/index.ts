import { RedisService } from "../services/RedisService";
import { ICacheService } from "./CacheService";

const cacheService: ICacheService = new RedisService();

export { cacheService };
