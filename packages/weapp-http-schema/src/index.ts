import NxFetch from '@jswork/next-fetch';
import httpRestConfig from '@jswork/http-rest-config';
import nxTaroRequest from '@jswork/next-taro-request';
import nxFetchWithDebug from '@jswork/next-fetch-with-debug';
import nxApplyFetchMilddeware from '@jswork/next-apply-fetch-middleware';

export default (inConfig, inOptions?): any => {
  const apiConfig = {};
  const fetch = nxApplyFetchMilddeware([nxFetchWithDebug])(nxTaroRequest);
  const http = NxFetch.getInstance({
    pipeStyle: 'request',
    fetch,
    ...inOptions
  });
  return httpRestConfig(apiConfig, http, inConfig);
};
