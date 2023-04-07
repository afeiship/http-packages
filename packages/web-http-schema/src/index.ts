import nx from '@jswork/next';
import NxFetch from '@jswork/next-fetch';
import httpRestConfig from '@jswork/http-rest-config';
import nxFetchWithDebug from '@jswork/next-fetch-with-debug';
import nxFetchWithTimeout from '@jswork/next-fetch-with-timeout';
import nxFetchWithCancelable from '@jswork/next-fetch-with-cancelable';
import nxFetchWithResponseType from '@jswork/next-fetch-with-response-type';
import '@jswork/next-apply-fetch-middleware';

export default (inConfig, inOptions?) => {
  const fetch = nx.applyFetchMiddleware([
    nxFetchWithTimeout,
    nxFetchWithCancelable,
    nxFetchWithResponseType,
    nxFetchWithDebug
  ])(global.fetch);

  const http = NxFetch.getInstance({
    fetch,
    ...inOptions
  });

  return httpRestConfig(http, inConfig);
};
