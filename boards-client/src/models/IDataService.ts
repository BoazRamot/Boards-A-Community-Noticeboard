'use strict';

export default interface IDataService<T> {
  get: (
    path: string,
    collectionName: string,
    conditions?: object,
    options?: object,
  ) => Promise<T[]>;
  getById: (path: string, collectionName: string, id: string) => Promise<T>;
  insert: (path: string, collectionName: string, data: FormData) => Promise<T>;
  update: (
    path: string,
    collectionName: string,
    id: string,
    data: FormData,
  ) => Promise<T>;
  remove: (path: string, collectionName: string, id: string) => Promise<boolean>;
}
