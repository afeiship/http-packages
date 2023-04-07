import nx from '@jswork/next';
import { EnhancedRequestInit } from './types';
import '@jswork/next-apply-fetch-middleware';
import '@jswork/fetch';

// import middlewares
import {
  middlewareResponseType,
  middlewareTimeout,
  middlewareDestroy,
  middlewareDebug,
} from './middlewares';

// default value
const defaults: EnhancedRequestInit = {
  timeout: 0,
  debug: false,
  destroyable: false,
  responseType: 'json',
};

const enhancedFetch = (inUrl: RequestInfo | URL, inInit?: EnhancedRequestInit) => {
  const options = { ...defaults, ...inInit };
  const enhanced = nx.applyFetchMiddleware([
    middlewareResponseType,
    middlewareTimeout,
    middlewareDebug,

    // Must be in last: because override promise method.
    middlewareDestroy,
  ])(fetch);

  return enhanced(inUrl, options);
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports) {
  module.exports = enhancedFetch;
}

export default enhancedFetch;
