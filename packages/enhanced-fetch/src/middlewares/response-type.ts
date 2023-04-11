import { MiddleWareFunction } from '../types';

const defaults = { responseType: 'json' };

export const middlewareResponseType: MiddleWareFunction = (inFetch) => (inUrl, inInit?) => {
  const { responseType, ...options } = { ...defaults, ...inInit };
  if (!responseType) return inFetch(inUrl, options);
  return inFetch(inUrl, options).then((r) => {
    const { ok, status } = r;
    const resType = ok ? responseType : 'text';
    return r[resType]().then((data) => {
      const payload = { ok, status, data };
      return Promise.resolve(payload);
    });
  });
};
