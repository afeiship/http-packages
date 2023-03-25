import axios, { CreateAxiosDefaults, AxiosInstance } from 'axios';
import dp from '@jswork/http-data-parser';
import '@jswork/next';
import '@jswork/next-tmpl';
import '@jswork/next-data-transform';

const URL_ACTIONS = ['get', 'delete', 'head', 'options'];

export interface Interceptor {
  type: 'request' | 'response' | 'error';
  fn: (inData: any) => any;
}

export type Config = {
  baseURL?: string;
  prefix?: string;
  request?: any[];
  interceptors?: Interceptor[];
  items: any[];
  cancelable?: boolean;
} & Pick<CreateAxiosDefaults, 'timeout' | 'headers' | 'transformRequest' | 'transformResponse'>;

export const registInterceptors = (inInterceptors: Interceptor[], inClient: AxiosInstance) => {
  const clientInterceptors = inClient.interceptors;
  inInterceptors.forEach((item) => {
    const { type, fn } = item;
    if (type === 'error') {
      clientInterceptors.response.use(nx.stubValue, fn);
    } else {
      clientInterceptors[type].use(fn);
    }
  });
};

export default (inConfig: Config, inInitOptions?: CreateAxiosDefaults): any => {
  const { interceptors, timeout, headers, cancelable, transformResponse, transformRequest } =
    inConfig;
  const client = axios.create(inInitOptions);
  const ctrl = cancelable ? new AbortController() : null;
  const destroy = cancelable ? () => ctrl?.abort() : nx.noop;

  const api = {};
  const request = inConfig.request;
  const items = inConfig.items;
  const baseUrl = inConfig.baseURL || `${location.protocol}//${location.host}`;
  const prefix = inConfig.prefix || '';

  if (interceptors?.length) registInterceptors(interceptors, client);

  items.forEach(function (item) {
    const _request = item.request;
    const _items = item.items;
    const _prefix = item.prefix || prefix;
    const _host = item.baseURL;

    nx.each(_items, function (key, _item) {
      const apiKey = _prefix + key;
      api[apiKey] = function (inData, inOptions) {
        const data = Array.isArray(inData) ? nx.mix.apply(nx, inData) : inData;
        const action = String(_item[0]).toLowerCase();
        const requestData = _request || request;
        const context = requestData[0];
        const dpData = dp(_item[1], data);
        const apiPath = nx.tmpl(_item[1], dpData[0]);
        const options = nx.mix(null, _item[2], inOptions);
        const dataType = nx.get(options, 'dataType', requestData[1]);
        const isGetStyle = URL_ACTIONS.includes(action);
        const params = dpData[1];
        const body = nx.DataTransform[dataType](dpData[1]);

        return client.request({
          url: (_host || baseUrl) + context + apiPath,
          method: action,
          signal: ctrl?.signal,
          timeout,
          headers,
          transformRequest,
          transformResponse,
          params,
          data: isGetStyle ? undefined : body,
          ...options,
        });
      };
    });
  });

  return { api, client, destroy };
};
