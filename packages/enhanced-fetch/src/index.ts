import nx from '@jswork/next';
import { EnhancedRequestInit, FetchFn } from './types';
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
  slim: false,
};

const enhancedFetch: FetchFn = (inUrl, inInit?) => {
  const options = { ...defaults, ...inInit };
  const enhanced = nx.applyFetchMiddleware([
    // Must be in first: because override promise method.
    middlewareDebug,
    middlewareDestroy,
    middlewareResponseType,
    middlewareTimeout,
  ])(fetch);

  return enhanced(inUrl, options);
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports) {
  module.exports = enhancedFetch;
}

export default enhancedFetch;
