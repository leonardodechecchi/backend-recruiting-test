import { ICacheService } from './CacheService';
import { DogCacheService } from './DogCacheService';

const cacheService: ICacheService = new DogCacheService();

export { cacheService };
