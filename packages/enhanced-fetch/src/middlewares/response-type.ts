import { MiddleWareFunction } from '../types';

const defaults = { responseType: 'json' };

export const middlewareResponseType: MiddleWareFunction = (inFetch) => (inUrl, inInit?) => {
  const { responseType, ...options } = { ...defaults, ...inInit };
  if (!responseType) return inFetch(inUrl, options);
  return inFetch(inUrl, options).then((response) => response[responseType]());
};
