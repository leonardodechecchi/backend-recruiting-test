import { ICacheService } from './CacheService';
import { DogCacheService } from './DogCacheService';

const dogCacheService: ICacheService = new DogCacheService();

export { dogCacheService };
