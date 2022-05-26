import NxFetch from '@jswork/next-fetch';
import httpSchema from '@jswork/http-schema';
import nxFetchWithDebug from '@jswork/next-fetch-with-debug';
import nxFetchWithTimeout from '@jswork/next-fetch-with-timeout';
import nxFetchWithCancelable from '@jswork/next-fetch-with-cancelable';
import nxFetchWithResponseType from '@jswork/next-fetch-with-response-type';
import nxApplyFetchMilddeware from '@jswork/next-apply-fetch-middleware';

export default (inConfig, inOptions?) => {
  const fetch = nxApplyFetchMilddeware([
    nxFetchWithTimeout,
    nxFetchWithCancelable,
    nxFetchWithResponseType,
    nxFetchWithDebug
  ])(global.fetch);

  const http = NxFetch.getInstance({
    fetch,
    ...inOptions
  });

  return httpSchema(inConfig, http);
};
