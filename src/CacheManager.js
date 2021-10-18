class CacheManager {
  constructor() {
    this.cacheKey = "cache";
    this.cache = {
      data: null,
      expiry: null,
    };
    this.cacheTimeout = 10 * 60 * 1000; // 10 minutes in MS
  }

  checkExpired(time) {
    return new Date(time).getTime() < new Date().getTime();
  }

  //will get the cache data from our this.cache if we haven't refreshed our page till Timeout time else will get the cached data from localStorage if it is present there
  getCache() {
    if (this.cache.data && !this.checkExpired(this.cache.expiry)) {
      return this.cache.data;
    }

    let myCache = localStorage.getItem(this.cacheKey);
    if (myCache) {
      myCache = JSON.parse(myCache);
      // check if cache expired
      if (this.checkExpired(myCache.expiry)) {
        // remove cache
        this.removeCache();
      } else {
        return myCache.data;
      }
    }
    return null;
  }

  // set cache on api call
  setCache(value) {
    this.cache = {
      data: value,
      expiry: new Date(new Date().getTime() + this.cacheTimeout),
    };
    localStorage.setItem(this.cacheKey, JSON.stringify(this.cache));
  }

  // remove cache after the time get expired
  removeCache() {
    localStorage.removeItem(this.cacheKey);
    this.cache = null;
  }
}

export default new CacheManager();
