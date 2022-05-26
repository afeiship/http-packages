import NxFetch from '@jswork/next-fetch';
import httpSchema from '@jswork/http-schema';
import nxTaroRequest from '@jswork/next-taro-request';
import nxFetchWithDebug from '@jswork/next-fetch-with-debug';
import nxApplyFetchMilddeware from '@jswork/next-apply-fetch-middleware';

export default (inConfig, inOptions?): any => {
  const fetch = nxApplyFetchMilddeware([nxFetchWithDebug])(nxTaroRequest);
  const http = NxFetch.getInstance({
    pipeStyle: 'request',
    fetch,
    ...inOptions
  });
  return httpSchema(inConfig, http);
};
