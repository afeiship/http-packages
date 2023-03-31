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

export interface NxStatic {
  $api: Record<string, any>;
}

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
    const request = item.request || inConfig.request;
    const prefix = item.prefix || inConfig.prefix || '';
    const suffix = item.suffix || inConfig.suffix || '';
    const baseURL = item.baseURL || inConfig.baseURL || `${location.protocol}//${location.host}`;
    const transform = item.transform || inConfig.transform || nx.stubValue;
    const timeout = item.timeout || inConfig.timeout;
    const headers = { ...inConfig.headers, ...item.headers };

    nx.each(item.items, function (key, _item) {
      const apiKey = prefix + key + suffix;
      api[apiKey] = function (inData, inOptions?: Options) {
        const data = Array.isArray(inData) ? nx.mix.apply(nx, inData) : inData;
        const method = String(_item[0]).toLowerCase();
        const isGetStyle = URL_ACTIONS.includes(method);
        const dpData = dp(_item[1], data);
        const apiPath = nx.tmpl(_item[1], dpData[0]);
        const options = { ..._item[2], ...inOptions };
        const dataType = options.dataType || request![1];
        const params = dpData[1];
        const body = nx.DataTransform[dataType](dpData[1]);
        const url = baseURL + request![0] + apiPath;

        return client
          .request({
            url,
            method,
            timeout,
            headers,
            params,
            data: isGetStyle ? undefined : body,
            ...options,
          })
          .then(transform);
      };
    });
  });

  // harmony: inject to nx
  if (harmony) nx.set(nx, '$api', api);

  return { api, client };
};

// for commonjs es5
module.exports = httpSchema;

// for es6
export default httpSchema;
