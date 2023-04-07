import nx from '@jswork/next';
import '@jswork/next-apply-fetch-middleware';
import '@jswork/fetch';

export type ResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer' | null;
export type FetchFn = (input: RequestInfo | URL, init?: RequestInit) => Response;

export interface EnhancedRequestInit extends RequestInit {
  timeout?: number;
  destroyable?: boolean;
  responseType?: ResponseType;
}

const defaults = {
  timeout: 0,
  destroyable: false,
  responseType: 'json',
};
// input: RequestInfo | URL, init?: RequestInit

const middlewareResponseType =
  (inFetch) => (inUrl: RequestInfo | URL, inInit?: EnhancedRequestInit) => {
    const { responseType, ...options } = { ...defaults, ...inInit };
    return inFetch(inUrl, options).then((response) => {
      if (responseType) {
        return response[responseType]();
      } else {
        return response;
      }
    });
  };

const middlewareTimeout = (inFetch) => (inUrl: RequestInfo | URL, inInit?: EnhancedRequestInit) => {
  const { timeout, ...options } = { ...defaults, ...inInit };
  if (timeout <= 0) return inFetch(inUrl, options);
  const controller = new AbortController();
  const { signal } = controller;

  // set timeout timer.
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  return inFetch(inUrl, { ...options, signal })
    .then((response) => {
      clearTimeout(timeoutId);
      return response;
    })
    .catch((error) => {
      if (error.name === 'AbortError') {
        throw new Error('Timeout');
      } else {
        throw error;
      }
    });
};

const destroyFetch = (inFetch) => (inUrl: RequestInfo | URL, inInit?: EnhancedRequestInit) => {
  const { destroyable, ...options } = { ...defaults, ...inInit };
  if (!destroyable) return inFetch(inUrl, options);

  const controller = new AbortController();
  const signal = controller.signal;
  const promise = fetch(inUrl, { signal, ...options });

  promise['destroy'] = () => {
    controller.abort();
  };

  return promise;
};

const enhancedFetch = (inUrl: RequestInfo | URL, inInit?: EnhancedRequestInit) => {
  const { timeout, destroyable, responseType, ...options } = { ...defaults, ...inInit };
  const betterFetch = nx.applyFetchMiddleware([
    middlewareTimeout,
    destroyFetch,
    middlewareResponseType,
  ])(fetch as any) as any;

  return betterFetch(inUrl, options);
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports) {
  module.exports = enhancedFetch;
}

export default enhancedFetch;
