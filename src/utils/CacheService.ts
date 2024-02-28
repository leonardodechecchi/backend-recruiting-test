interface ICacheService {
  get<T>(key: string): T | undefined;
  set<T>(key: string, data: T, duration?: number): void;
  purge(): void;
}

type CacheItem<T> = {
  data: T;
  expiry: number;
};

class CacheService implements ICacheService {
  private cache: Record<string, CacheItem<any>>;
  private duration: number;

  constructor(duration: number = 60 * 1000) {
    this.cache = {};
    this.duration = duration;
  }

  public get<T>(key: string): T | undefined {
    const item = this.cache[key];

    if (!!item && Date.now() < item.expiry) {
      return item.data;
    }

    delete this.cache[key];

    return undefined;
  }

  public set<T>(key: string, data: T, duration: number = this.duration): void {
    const expiry = Date.now() + duration;
    this.cache[key] = { data, expiry };
  }

  public purge(): void {
    for (let key in this.cache) {
      delete this.cache[key];
    }
  }
}

export { ICacheService, CacheService };
