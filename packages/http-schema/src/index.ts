import axios, { CreateAxiosDefaults } from 'axios';
import dp from '@jswork/http-data-parser';
import '@jswork/next';
import '@jswork/next-tmpl';
import '@jswork/next-data-transform';

const URL_ACTIONS = ['get', 'delete', 'head', 'options'];

export default (inConfig, inInitOptions?: CreateAxiosDefaults): any => {
  const httpClient = axios.create(inInitOptions);
  const context = {};
  const request = inConfig.request;
  const items = inConfig.items;
  const baseUrl = inConfig.baseURL || '//' + location.host;
  const prefix = inConfig.prefix || '';

  items.forEach(function (item) {
    const _request = item.request;
    const _items = item.items;
    const _prefix = item.prefix || prefix;
    const _host = item.baseURL;

    nx.each(_items, function (key, _item) {
      const apiKey = _prefix + key;
      context[apiKey] = function (inData, inOptions) {
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
        const body = nx.NxDataTransform[dataType](dpData[1]);

        // return httpClient[action]((_host || baseUrl) + context + apiPath, params, options);
        return httpClient.request({
          url: (_host || baseUrl) + context + apiPath,
          method: action,
          params,
          data: isGetStyle ? undefined : body,
          ...options
        });
      };
    });
  });

  return context;
};
