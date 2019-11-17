'use strict';

export default interface ILookup<T> {
  [id: string]: T;
}
