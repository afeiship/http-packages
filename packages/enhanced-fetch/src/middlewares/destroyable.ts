import { MiddleWareFunction } from '../types';

const defaults = { destroyable: false };

export const middlewareDestroy: MiddleWareFunction = (inFetch) => (inUrl, inInit?) => {
  const { destroyable, ...options } = { ...defaults, ...inInit };
  if (!destroyable) return inFetch(inUrl, options);

  const controller = new AbortController();
  const signal = controller.signal;
  const promise = inFetch(inUrl, { signal, ...options });

  promise.destroy = () => {
    controller.abort();
  };

  return promise;
};
