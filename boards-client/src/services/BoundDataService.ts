import DataService from './data.service';

export default class BoundDataService<T> {
  public get: (conditions?: object) => Promise<T[]>;
  public getById: (id: string) => Promise<T>;
  public insert: (data: FormData) => Promise<T>;
  public update: (id: string, data: FormData) => Promise<T>;
  public remove: (id: string) => Promise<boolean>;
  private _dataService = new DataService<T>();
  constructor(path: string, collectionName: string) {
    this.get = this._dataService.get.bind(null, path, collectionName);
    this.getById = this._dataService.getById.bind(null, path, collectionName);
    this.insert = this._dataService.insert.bind(null, path, collectionName);
    this.update = this._dataService.update.bind(null, path, collectionName);
    this.remove = this._dataService.remove.bind(null, path, collectionName);
  }
}
