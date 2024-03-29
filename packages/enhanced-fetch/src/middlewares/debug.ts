import { MiddleWareFunction } from '../types';

const defaults = { debug: false };

export const middlewareDebug: MiddleWareFunction = (inFetch) => (inUrl, inInit?) => {
  const { debug, ...options } = { ...defaults, ...inInit };
  if (!debug) return inFetch(inUrl, options);
  const opts = { url: inUrl, ...options };
  console.log('\n :::::::::DEBUG::::::::: \n');
  console.log(opts);
  return inFetch(inUrl, options);
};
