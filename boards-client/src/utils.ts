'use strict';

// converts a function that takes a callback to a function
// that returns a promise. In case input param is an object =>
// promisify all its functions.
export const promisify = (param: object | Function) => {
  const promisifyFunc = (func: Function) => (...params: any[]) =>
    new Promise((resolve, reject) => {
      func(...params, (err: any, data: any) =>
        err ? reject(err) : resolve(data || true),
      );
    }) as any;

  const promisifyObj = (obj: { [index: string]: any }) =>
    Object.keys(obj)
      .filter(key => typeof obj[key] === 'function')
      .reduce(
        (acc, cur) => ({ ...acc, [cur]: promisifyFunc(obj[cur]) }),
        {},
      ) as any;
  switch (typeof param) {
    case 'function':
      return promisifyFunc(param);
    case 'object':
      return promisifyObj(param);
    default:
      throw new Error('param must be of type object or Function');
  }
};
