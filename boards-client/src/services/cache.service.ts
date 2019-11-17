export interface ICachedCollection {
  [id: string]: any;
}

/*** Error messages ***/
const COLLECTION_DOES_NOT_EXIST = (collectionName: string) =>
  `cache for collection ${collectionName} does not exist. Call addCollection to add collection.`;

const cache = new Map<string, Map<any, any>>();
const idFields = new Map<string, string>();

export default class CacheService {
  public addCollection<T extends ICachedCollection>(
    collectionName: string,
    idField: string,
  ) {
    if (!cache.has(collectionName)) {
      cache.set(collectionName, new Map<any, T>());
      idFields.set(collectionName, idField);
    }
  }

  public removeCollection(collectionName: string) {
    this.clear(collectionName);
    cache.delete(collectionName);
    idFields.delete(collectionName);
  }

  public clear(collectionName: string) {
    if (cache.has(collectionName)) {
      const collectionCache = cache.get(collectionName) as Map<any, any>;
      collectionCache.clear();
    }
  }

  public delete(collectionName: string, id: any) {
    if (cache.has(collectionName)) {
      const collectionCache = cache.get(collectionName) as Map<any, any>;
      collectionCache.delete(id);
    }
  }

  public has(collectionName: string, id?: any) {
    if (!cache.has(collectionName)) {
      return false;
    }
    if (id) {
      const collectionCache = cache.get(collectionName) as Map<any, any>;
      return collectionCache.has(id);
    }
    return true;
  }

  public get<T extends ICachedCollection>(collectionName: string, id?: any) {
    if (!cache.has(collectionName)) {
      throw COLLECTION_DOES_NOT_EXIST(collectionName);
    }
    const collectionCache = cache.get(collectionName) as Map<any, T>;
    if (id) {
      return collectionCache.get(id) as T;
    } else {
      return [...collectionCache.values()];
    }
  }

  public setOne<T extends ICachedCollection>(collectionName: string, data: T) {
    if (!cache.has(collectionName)) {
      throw COLLECTION_DOES_NOT_EXIST(collectionName);
    }
    const idField = idFields.get(collectionName) as string;
    const collectionCache = cache.get(collectionName) as Map<any, T>;
    collectionCache.set(data[idField], data);
  }

  public setMany<T extends ICachedCollection>(
    collectionName: string,
    data: T[],
  ) {
    if (!cache.has(collectionName)) {
      throw COLLECTION_DOES_NOT_EXIST(collectionName);
    }
    data.forEach(rec => {
      this.setOne(collectionName, rec);
    });
  }
}
