import { MiddleWareFunction } from '../types';

const defaults = { debug: false };

export const middlewareDebug: MiddleWareFunction = (inFetch) => (inUrl, inInit?) => {
  const { debug, ...options } = { ...defaults, ...inInit };
  if (!debug) return inFetch(inUrl, options);
  console.log('DEBUG: ', inUrl, options);
  return inFetch(inUrl, options);
};
