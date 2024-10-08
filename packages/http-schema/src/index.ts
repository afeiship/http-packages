import nx from '@jswork/next';
import httpRestConfig, { TransformApiArgs } from '@jswork/http-rest-config';

interface HttpSchemaOptions {
  adapter?: string;
  harmony?: boolean;
  priority?: number;
  transformApi?: (args: TransformApiArgs) => Promise<any>;
  dynamicApi?: (apis: Record<string, any>, ...args) => Promise<any>;

  [key: string]: any;
}

const defaults: HttpSchemaOptions = { adapter: 'Axios', harmony: false };
const FETCH_IMPORT_MSG = 'Please import @jswork/next-fetch first.';
const isFetchAdapterNil = (inAdapter) => {
  return inAdapter === 'Fetch' && typeof nx[inAdapter] === 'undefined';
};

const httpSchema = (inConfig, inOptions?: HttpSchemaOptions) => {
  const { adapter, harmony, transformApi, dynamicApi, ...options } = {
    ...defaults,
    ...inOptions,
  } as HttpSchemaOptions;
  if (isFetchAdapterNil(adapter)) nx.error(FETCH_IMPORT_MSG);
  const httpClient = nx[adapter!].getInstance(options);
  const httpRestOpts = transformApi ? { transformApi } : undefined;
  const context = httpRestConfig(httpClient, inConfig, httpRestOpts);
  const dynamicFn = (...args: any[]) => dynamicApi?.(context, ...args) ?? Promise.resolve(null);
  const dynamicFnGenerator =
    (...args: any[]) =>
    () =>
      dynamicFn(...args);

  if (harmony) {
    nx.$api = context;
    nx.$dapi = dynamicFn;
    nx.$dapiFn = dynamicFnGenerator;
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
