import { MiddleWareFunction } from '../types';

const defaults = { responseType: 'json', slim: false };

export const middlewareResponseType: MiddleWareFunction = (inFetch) => (inUrl, inInit?) => {
  const { responseType, ...options } = { ...defaults, ...inInit };
  if (!responseType) return inFetch(inUrl, options);
  return inFetch(inUrl, options).then((original: Response) => {
    const { ok, status } = original;
    const stubResponse = status === 204 ? Promise.resolve(null) : original[responseType]();
    return stubResponse
      .then((data: any) => {
        if (!ok) return Promise.reject(data);
        return { status, data, original };
      })
      .catch((error: any) => {
        return { status, data: error, original };
      });
  });
};
