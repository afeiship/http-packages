import dp from '@jswork/http-data-parser';
import nx from '@jswork/next';
import '@jswork/next-data-transform';
import '@jswork/next-tmpl';
import '@jswork/next-content-type';

const GET_STYLE = ['get', 'delete', 'head', 'options'];

const httpRestConfig = (inHttpClient, inConfig) => {
  const apiConfig = {};
  const items = inConfig.items;

  items.forEach(function (item) {
    const request = item.request || inConfig.request;
    const prefix = item.prefix || inConfig.prefix || '';
    const suffix = item.suffix || inConfig.suffix || '';
    const baseURL = item.baseURL || inConfig.baseURL || `${location.protocol}//${location.host}`;

    nx.each(item.items, function (key, _item) {
      const apiKey = prefix + key + suffix;
      apiConfig[apiKey] = function (inData, inOptions) {
        const data = Array.isArray(inData) ? nx.mix.apply(nx, inData) : inData;
        const method = String(_item[0]).toLowerCase();
        const isGetStyle = GET_STYLE.includes(method);
        const subpath = request[0];
        const dpData = dp(_item[1], data);
        const apiPath = nx.tmpl(_item[1], dpData[0]);
        const options = nx.mix(null, _item[2], inOptions);
        const dataType = nx.get(options, 'dataType', request[1]);
        const params = isGetStyle ? dpData[1] : nx.DataTransform[dataType](dpData[1]);
        const url = baseURL + subpath + apiPath;
        const contentType = nx.contentType(dataType);

        // when headers is null
        nx.mix(options, { headers: options.headers || {}, dataType: dataType });
        nx.mix(options.headers, { 'Content-Type': nx.contentType(dataType) });
        if (!contentType) delete options.headers['Content-Type'];

        return inHttpClient[method](url, params, options);
      };
    });
  });
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports) {
  module.exports = httpRestConfig;
}

export default httpRestConfig;
