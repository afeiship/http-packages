import nx from '@jswork/next';
import httpRestConfig from '@jswork/http-rest-config';
import nxTaroRequest from '@jswork/next-taro-request';
import nxFetchWithDebug from '@jswork/next-fetch-with-debug';
import '@jswork/next-apply-fetch-middleware';
import '@jswork/next-fetch';

export default (inConfig, inOptions?): any => {
  const fetch = nx.applyFetchMiddleware([nxFetchWithDebug])(nxTaroRequest);
  const http = nx.Fetch.getInstance({
    pipeStyle: 'request',
    fetch,
    ...inOptions
  });
  return httpRestConfig(http, inConfig);
};
