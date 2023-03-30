import axios, { CreateAxiosDefaults, AxiosInstance } from 'axios';
import dp from '@jswork/http-data-parser';
import '@jswork/next';
import '@jswork/next-tmpl';
import '@jswork/next-data-transform';

export interface Interceptor {
  type: 'request' | 'response' | 'error';
  fn: (inData: any) => any;
}

// 初始化的时候，一次性的配置
export type Config = {
  baseURL?: string;
  prefix?: string;
  suffix?: string;
  request?: any[];
  interceptors?: Interceptor[];
  items: any[];
  harmony?: boolean;
} & Pick<CreateAxiosDefaults, 'timeout' | 'headers' | 'transformRequest' | 'transformResponse'>;

// 每次请求的时候，可选的配置
export type Options = {
  abortable?: boolean;
  dataType?: 'json' | 'urlencoded' | 'multipart' | 'raw';
};

// harmony: inject to nx
export interface NxStatic {
  $api: Record<string, any>;
}

const URL_ACTIONS = ['get', 'delete', 'head', 'options'];
const registInterceptors = (inInterceptors: Interceptor[], inClient: AxiosInstance) => {
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

module.exports = (inConfig: Config, inInitOptions?: CreateAxiosDefaults): any => {
  const { harmony, interceptors, timeout, headers, transformResponse, transformRequest } = inConfig;
  const client = axios.create(inInitOptions);

  const api = {};
  const request = inConfig.request;
  const items = inConfig.items;

  if (interceptors?.length) registInterceptors(interceptors, client);

  items.forEach(function (item) {
    const _request = item.request;
    const _items = item.items;
    const _prefix = item.prefix || inConfig.prefix || '';
    const _suffix = item.suffix || inConfig.suffix || '';
    const baseURL = item.baseURL || inConfig.baseURL || `${location.protocol}//${location.host}`;

    nx.each(_items, function (key, _item) {
      const apiKey = _prefix + key + _suffix;
      api[apiKey] = function (inData, inOptions?: Options) {
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
          url: baseURL + context + apiPath,
          method: action,
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

  // harmony: inject to nx
  if (harmony) nx.set(nx, '$api', api);

  return { api, client };
};
