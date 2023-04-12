import { MiddleWareFunction } from '../types';

const defaults = { responseType: 'json', slim: false };

export const middlewareResponseType: MiddleWareFunction = (inFetch) => (inUrl, inInit?) => {
  const { responseType, slim, ...options } = { ...defaults, ...inInit };
  if (!responseType) return inFetch(inUrl, options);
  return inFetch(inUrl, options).then((original) => {
    const { ok, status } = original;
    const resType = ok ? responseType : 'text';
    const extra = slim ? null : { original };
    return original[resType]().then((data) => {
      return { status, data, ...extra };
    });
  });
};
