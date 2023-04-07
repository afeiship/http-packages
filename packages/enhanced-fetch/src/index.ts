import '@jswork/fetch';

type ResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer' | null;

interface EnhancedRequestInit extends RequestInit {
  timeout?: number;
  destroyable?: boolean;
  responseType?: ResponseType;
}

const defaults = {
  timeout: 0,
  destroyable: false,
  responseType: 'json',
};

// const responseTypeFetch = (inInput: RequestInfo | URL, inInit?: EnhancedRequestInit) => {};
// const timeoutFetch = (inInput: RequestInfo | URL, inInit?: EnhancedRequestInit) => {};
// const destroyFetch = (inInput: RequestInfo | URL, inInit?: EnhancedRequestInit) => {};

const enhancedFetch = (inUrl: string, inInit?: EnhancedRequestInit) => {
  const { timeout, destroyable, responseType, ...options } = { ...defaults, ...inInit };

  // timeout
  if (timeout > 0) {
    const controller = new AbortController();
    const { signal } = controller;

    // set timeout timer.
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);

    return fetch(inUrl, { ...options, signal })
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
  }
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports) {
  module.exports = enhancedFetch;
}

export default enhancedFetch;
