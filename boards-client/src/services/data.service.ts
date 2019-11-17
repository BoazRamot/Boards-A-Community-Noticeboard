import * as querystring from 'querystring';
import IDataService from '../models/IDataService';
import CacheService from './cache.service';

export enum DataCollections {
  Boards = 'boards',
  Posts = 'posts',
  Comments = 'comments',
  Images = 'images',
  Users = 'users',
}

const PORT = 5000;
const baseURL = `http://localhost:${PORT}`;
export const apiURL = `${baseURL}/api`;

const cacheService = new CacheService();

export default class DataService<T> implements IDataService<T> {
  public setCache(collectionName: string, idField = '_id') {
    cacheService.addCollection(collectionName, idField);
  }

  public removeCache(collectionName: string) {
    cacheService.removeCollection(collectionName);
  }

  public async get(
    path: string,
    collectionName: string,
    conditions?: any,
    options?: any,
  ): Promise<T[]> {
    if (cacheService.has(collectionName)) {
      const cachedData = cacheService.get(collectionName) as T[];
      if (cachedData.length > 0) {
        return cachedData;
      }
    }

    const response = await errorHandler(
      fetch(
        `${collectionUrl(path, collectionName)}${
          conditions ? `?${querystring.stringify(conditions)}` : ''
        }`,
        {
          headers: new Headers(options),
        },
      ),
    );
    const result = await response.json();
    if (cacheService.has(collectionName)) {
      cacheService.setMany(collectionName, result);
    }
    return result;
  }

  public async getById(
    path: string,
    collectionName: string,
    id: string,
  ): Promise<T> {
    if (cacheService.has(collectionName, id)) {
      return cacheService.get(collectionName, id) as T;
    }
    const response = await errorHandler(
      fetch(`${collectionUrl(path, collectionName)}/${id}`),
    );
    const result = await response.json();
    if (cacheService.has(collectionName)) {
      cacheService.setOne(collectionName, result);
    }
    return result;
  }

  public async insert(
    path: string,
    collectionName: string,
    data: FormData,
  ): Promise<T> {
    const response = await errorHandler(
      fetch(`${collectionUrl(path, collectionName)}`, {
        method: 'POST',
        body: data,
      }),
    );
    const result = await response.json();
    if (cacheService.has(collectionName)) {
      cacheService.setOne(collectionName, result);
    }
    return result;
  }

  public async update(
    path: string,
    collectionName: string,
    id: string,
    data: FormData,
  ): Promise<T> {
    const response = await errorHandler(
      fetch(`${collectionUrl(path, collectionName)}/${id}`, {
        method: 'PUT',
        body: data,
      }),
    );
    const result = await response.json();
    if (cacheService.has(collectionName)) {
      cacheService.setOne(collectionName, result);
    }
    return result;
  }

  public async remove(
    path: string,
    collectionName: string,
    id: string,
  ): Promise<boolean> {
    const response = await errorHandler(
      fetch(`${collectionUrl(path, collectionName)}/${id}`, {
        method: 'DELETE',
      }),
    );
    if (cacheService.has(collectionName)) {
      cacheService.delete(collectionName, id);
    }
    return response.json();
  }
}

/*** Helper Functions ***/
async function errorHandler(fetch: Promise<Response>) {
  const response = await fetch;
  if (!response.ok) {
    const result = await response.json();
    throw result.error.message;
  }
  return response;
}

function collectionUrl(path: string, collectionName: string) {
  return `${apiURL}/${path ? `${path}/` : ''}${collectionName}`;
}
