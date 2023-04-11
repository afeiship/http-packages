import nx from '@jswork/next';
import httpRestConfig from '@jswork/http-rest-config';
import '@jswork/next-fetch';

const nodeHttpSchema = (inConfig, inOptions?) => {
  const http = nx.Fetch.getInstance(inOptions);
  return httpRestConfig(http, inConfig);
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports) {
  module.exports = nodeHttpSchema;
}

export default nodeHttpSchema;
