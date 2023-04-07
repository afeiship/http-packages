import nx from '@jswork/next';
import httpRestConfig from '@jswork/http-rest-config';
import NxFetch from '@jswork/next-fetch';
import nxFetchWithDebug from '@jswork/next-fetch-with-debug';
import nxFetchWithTimeout from '@jswork/next-fetch-with-timeout';
import nxFetchWithDelay from '@jswork/next-fetch-with-delay';
import nxFetchWithRandomUa from '@jswork/next-fetch-with-random-ua';
import nxFetchWithProxy from '@jswork/next-fetch-with-proxy';
import '@jswork/next-apply-fetch-middleware';
import nodeFetch from 'node-fetch';

export default (inConfig, inOptions?) => {
  const apiConfig = {};
  const fetch = nx.applyFetchMiddleware([
    nxFetchWithTimeout,
    nxFetchWithDelay,
    nxFetchWithRandomUa,
    nxFetchWithProxy,
    nxFetchWithDebug
  ])(nodeFetch);

  const http = NxFetch.getInstance({
    fetch,
    ...inOptions
  });

  return httpRestConfig(apiConfig, http, inConfig);
};
