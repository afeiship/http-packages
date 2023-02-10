import axios, { CreateAxiosDefaults } from 'axios';
import dp from '@jswork/http-data-parser';
import '@jswork/next';
import '@jswork/next-tmpl';
import '@jswork/next-data-transform';

export default (inConfig, inInitOptions?: CreateAxiosDefaults): any => {
  const httpClient = axios.create(inInitOptions);
  const context = {};
  var request = inConfig.request;
  var items = inConfig.items;
  var baseUrl = inConfig.baseURL || '//' + location.host;
  var prefix = inConfig.prefix || '';

  items.forEach(function (item) {
    var _request = item.request;
    var _items = item.items;
    var _prefix = item.prefix || prefix;
    var _host = item.baseURL;

    nx.each(_items, function (key, _item) {
      var apiKey = _prefix + key;
      context[apiKey] = function (inData, inOptions) {
        var data = Array.isArray(inData) ? nx.mix.apply(nx, inData) : inData;
        var action = String(_item[0]).toLowerCase();
        var requestData = _request || request;
        var context = requestData[0];
        var dpData = dp(_item[1], data);
        var apiPath = nx.tmpl(_item[1], dpData[0]);
        var options = nx.mix(null, _item[2], inOptions);
        var dataType = nx.get(options, 'dataType', requestData[1]);
        var params = action === 'get' ? dpData[1] : nx.NxDataTransform[dataType](dpData[1]);

        return httpClient[action]((_host || baseUrl) + context + apiPath, params, options);
      };
    });
  });

  return context;
};
