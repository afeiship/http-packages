import nx from '@jswork/next';
import '@jswork/next-compose';

nx.applyFetchMiddleware = function (inMiddlewares) {
  return function (inFetch) {
    return function (url, options) {
      const composedFetch = nx.compose.apply(null, inMiddlewares)(inFetch);
      return composedFetch(url, options);
    };
  };
};

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = nx.applyFetchMiddleware;
}

export default nx.applyFetchMiddleware;
