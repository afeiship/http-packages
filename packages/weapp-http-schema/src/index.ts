import nx from '@jswork/next';
import NxFetch from '@jswork/next-fetch';
import httpRestConfig from '@jswork/http-rest-config';
import nxTaroRequest from '@jswork/next-taro-request';
import nxFetchWithDebug from '@jswork/next-fetch-with-debug';
import '@jswork/next-apply-fetch-middleware';

export default (inConfig, inOptions?): any => {
  const fetch = nx.applyFetchMiddleware([nxFetchWithDebug])(nxTaroRequest);
  const http = NxFetch.getInstance({
    pipeStyle: 'request',
    fetch,
    ...inOptions
  });
  return httpRestConfig(http, inConfig);
};
