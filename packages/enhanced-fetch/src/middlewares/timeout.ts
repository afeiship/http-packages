import { MiddleWareFunction } from '../types';

const defaults = { timeout: 0 };

export const middlewareTimeout: MiddleWareFunction = (inFetch) => (inUrl, inInit?) => {
  const { timeout, ...options } = { ...defaults, ...inInit };
  if (timeout <= 0) return inFetch(inUrl, options);
  const controller = new AbortController();
  const { signal } = controller;

  // set timeout timer.
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  return inFetch(inUrl, { signal, ...options })
    .then((response) => {
      clearTimeout(timeoutId);
      return response;
    })
    .catch((error) => {
      const isAbortErr = error.name === 'AbortError';
      throw isAbortErr ? new Error('Timeout') : error;
    });
};
