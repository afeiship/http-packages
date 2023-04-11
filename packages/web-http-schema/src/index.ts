import nx from '@jswork/next';
import httpRestConfig from '@jswork/http-rest-config';
import '@jswork/next-fetch';

export default (inConfig, inOptions?) => {
  const http = nx.Fetch.getInstance(inOptions);
  return httpRestConfig(http, inConfig);
};
