import { MiddleWareFunction } from '../types';

const defaults = { responseType: 'json' };

export const middlewareResponseType: MiddleWareFunction = (inFetch) => (inUrl, inInit?) => {
  const { responseType, ...options } = { ...defaults, ...inInit };
  if (!responseType) return inFetch(inUrl, options);
  return inFetch(inUrl, options).then((original) => {
    const { ok, status } = original;
    const resType = ok ? responseType : 'text';
    return original[resType]().then((data) => {
      const payload = { status, original, data };
      return Promise.resolve(payload);
    });
  });
};
