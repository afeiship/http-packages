import axios, { CreateAxiosDefaults, AxiosRequestConfig, AxiosInstance } from 'axios';
import dp from '@jswork/http-data-parser';
import nx from '@jswork/next';
import '@jswork/next-tmpl';
import '@jswork/next-data-transform';

type SubPath = string;
type DataType = 'json' | 'urlencoded' | 'multipart' | 'raw';
type InterceptorType = 'request' | 'response' | 'error';
type RequestPair = [SubPath, DataType];
type ExtendAxiosConfig = Pick<
  CreateAxiosDefaults,
  'timeout' | 'headers' | 'transformRequest' | 'transformResponse' | 'responseType'
>;

export interface Interceptor {
  type: InterceptorType;
  fn: (inData: any) => any;
}

export type ConfigItem = {
  baseURL?: string;
  prefix?: string;
  suffix?: string;
  request?: RequestPair;
  transform?: (res) => any;
  items: Record<string, [string, string, any?]>;
} & ExtendAxiosConfig;

export type Config = {
  interceptors?: Interceptor[];
  harmony?: boolean;
  items: ConfigItem[];
} & Omit<ConfigItem, 'items'> &
  ExtendAxiosConfig;

export type Options = { dataType?: DataType } & AxiosRequestConfig;

const URL_ACTIONS = ['get', 'delete', 'head', 'options'];
const registInterceptors = (inInterceptors: Interceptor[], inClient: AxiosInstance) => {
  const { interceptors } = inClient;
  inInterceptors.forEach(({ type, fn }) => {
    type === 'error' ? interceptors.response.use(nx.stubValue, fn) : interceptors[type].use(fn);
  });
};

const httpSchema = (inConfig: Config, inInitOptions?: CreateAxiosDefaults): any => {
  const { harmony, interceptors } = inConfig;
  const client = axios.create(inInitOptions);
  const api = {};

  if (interceptors?.length) registInterceptors(interceptors, client);

  inConfig.items.forEach(function (item) {
    const prefix = item.prefix || inConfig.prefix || '';
    const suffix = item.suffix || inConfig.suffix || '';
    const baseURL = item.baseURL || inConfig.baseURL || `${location.protocol}//${location.host}`;
    const transform = item.transform || inConfig.transform || nx.stubValue;
    const timeout = item.timeout || inConfig.timeout;
    const headers = { ...inConfig.headers, ...item.headers };
    const [basePath, baseDataType] = item.request || inConfig.request!;

    nx.each(item.items, function (key, _item) {
      const apiKey = prefix + key + suffix;
      const [_method, _subpath, _opts] = _item;

      api[apiKey] = function (inData, inOptions?: Options) {
        const data = Array.isArray(inData) ? nx.mix.apply(nx, inData) : inData;
        const method = String(_method).toLowerCase();
        const isGetStyle = URL_ACTIONS.includes(method);
        const [extParams, extPayload] = dp(_subpath, data);
        const apiPath = nx.tmpl(_subpath, extParams);
        const options = { ..._opts, ...inOptions };
        const dataType = options.dataType || baseDataType;
        const body = nx.DataTransform[dataType](extPayload);
        const url = baseURL + basePath + apiPath;

        return client
          .request({
            url,
            method,
            timeout,
            headers,
            params: extPayload,
            data: isGetStyle ? undefined : body,
            ...options,
          })
          .then(transform);
      };
    });
  });

  // harmony: inject to nx(ts not work)
  if (harmony) nx.set(nx, '$api', api);

  return { api, client };
};

// for commonjs es5
if (typeof module !== 'undefined' && module.exports) module.exports = httpSchema;

// for es6
export default httpSchema;
