import { MiddleWareFunction } from '../types';

const defaults = { responseType: 'json' };

export const middlewareResponseType: MiddleWareFunction = (inFetch) => (inUrl, inInit?) => {
  const { responseType, ...options } = { ...defaults, ...inInit };
  return inFetch(inUrl, options).then((response) => {
    if (responseType) {
      return response[responseType]();
    } else {
      return response;
    }
  });
};
