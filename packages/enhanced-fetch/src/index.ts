import nx from '@jswork/next';
import { EnhancedRequestInit, ResponseType } from './types';
import '@jswork/next-apply-fetch-middleware';
import '@jswork/fetch';

import { middlewareResponseType, middlewareTimeout, middlewareDestroy } from './middlewares';

const defaults: EnhancedRequestInit = {
  timeout: 0,
  destroyable: false,
  responseType: 'json',
};

const enhancedFetch = (inUrl: RequestInfo | URL, inInit?: EnhancedRequestInit) => {
  const options = { ...defaults, ...inInit };
  const enhanced = nx.applyFetchMiddleware([
    middlewareResponseType,
    middlewareTimeout,
    middlewareDestroy,
  ])(fetch);

  return enhanced(inUrl, options);
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports) {
  module.exports = enhancedFetch;
}

export default enhancedFetch;
