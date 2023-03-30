import NxFetch from '@jswork/next-fetch';
import httpRestConfig from '@jswork/http-rest-config';
import nxFetchWithDebug from '@jswork/next-fetch-with-debug';
import nxFetchWithTimeout from '@jswork/next-fetch-with-timeout';
import nxFetchWithCancelable from '@jswork/next-fetch-with-cancelable';
import nxFetchWithResponseType from '@jswork/next-fetch-with-response-type';
import nxApplyFetchMiddleware from '@jswork/next-apply-fetch-middleware';

export default (inConfig, inOptions?) => {
  const apiConfig = {};
  const fetch = nxApplyFetchMiddleware([
    nxFetchWithTimeout,
    nxFetchWithCancelable,
    nxFetchWithResponseType,
    nxFetchWithDebug
  ])(global.fetch);

  const http = NxFetch.getInstance({
    fetch,
    ...inOptions
  });

  return httpRestConfig(apiConfig, http, inConfig);
};
