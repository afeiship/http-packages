import nx from '@jswork/next';
import httpRestConfig, { TransformApiArgs } from '@jswork/http-rest-config';

interface HttpSchemaOptions {
  adapter?: string;
  harmony?: boolean;
  transformApi?: (args: TransformApiArgs) => Promise<any>;

  [key: string]: any;
}

const defaults: HttpSchemaOptions = { adapter: 'Axios', harmony: false };
const FETCH_IMPORT_MSG = 'Please import @jswork/next-fetch first.';
const isFetchAdapterNil = (inAdapter) => {
  return inAdapter === 'Fetch' && typeof nx[inAdapter] === 'undefined';
};

const httpSchema = (inConfig, inOptions?: HttpSchemaOptions) => {
  const { adapter, harmony, transformApi, ...options } = {
    ...defaults,
    ...inOptions,
  } as HttpSchemaOptions;
  if (isFetchAdapterNil(adapter)) nx.error(FETCH_IMPORT_MSG);
  const httpClient = nx[adapter!].getInstance(options);
  const httpRestOpts = transformApi ? { transformApi } : undefined;
  const context = httpRestConfig(httpClient, inConfig, httpRestOpts);

  if (harmony) {
    nx.$api = context;
    nx.$http = httpClient;
  }
  return context;
};

// for commonjs es5
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = httpSchema;
}

// for es6
export default httpSchema;
