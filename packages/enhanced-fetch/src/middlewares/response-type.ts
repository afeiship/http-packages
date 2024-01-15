import { MiddleWareFunction } from '../types';

const defaults = { responseType: 'json', slim: false };

export const middlewareResponseType: MiddleWareFunction = (inFetch) => (inUrl, inInit?) => {
  const { responseType, ...options } = { ...defaults, ...inInit };
  if (!responseType) return inFetch(inUrl, options);
  return inFetch(inUrl, options).then((original) => {
    const { ok, status } = original;
    const resType = ok ? responseType : 'text';
    const stubResponse = status === 204 ? Promise.resolve(null) : original[resType]();
    return stubResponse
      .then((data) => {
        return { status, data, original };
      })
      .catch((error) => {
        return { status, data: error, original };
      });
  });
};
