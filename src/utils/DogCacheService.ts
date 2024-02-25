import { CacheService } from './CacheService';

class DogCacheService extends CacheService {
  constructor(duration: number = 60 * 1000) {
    super(duration);
  }
}

export { DogCacheService };
