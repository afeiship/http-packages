import nx from '@jswork/next';
import httpRestConfig from '@jswork/http-rest-config';

const defaults = { adapter: 'Axios' };
const FETCH_IMPORT_MSG = 'Please import @jswork/next-fetch first.';
const isFetchAdapterNil = (inAdapter) => {
  return inAdapter === 'Fetch' && typeof nx[inAdapter] === 'undefined';
};

const httpSchema = (inConfig, inOptions?) => {
  const { adapter, ...options } = { ...defaults, ...inOptions } satisfies { adapter: string };
  if (isFetchAdapterNil(adapter)) nx.error(FETCH_IMPORT_MSG);
  const http = nx[adapter].getInstance(options);
  return httpRestConfig(http, inConfig);
};

// for commonjs es5
// if (typeof module !== 'undefined' && module.exports) module.exports = httpSchema;

// for es6
export default httpSchema;
