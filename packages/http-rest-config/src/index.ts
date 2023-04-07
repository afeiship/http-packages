import dp from '@jswork/http-data-parser';
import nx from '@jswork/next';
import '@jswork/next-data-transform';
import '@jswork/next-tmpl';
import '@jswork/next-content-type';
import '@jswork/next-difference';

const GET_STYLE = ['get', 'delete', 'head', 'options'];
const STD_RESOURCE_ACTIONS = {
  index: ['get', '@'],
  show: ['get', '@/{id}'],
  create: ['post', '@'],
  update: ['put', '@/{id}'],
  destroy: ['delete', '@/{id}'],
} as const;

const STD_KEYS = Object.keys(STD_RESOURCE_ACTIONS);
const normalizeResource = (inResources) => {
  return inResources.map((resource) => {
    const { name, only, except, ...others } = resource;
    const items = {};
    const hasOnly = !!only?.length;
    const hasExcept = !!except?.length;
    let current = [...STD_KEYS];

    current = hasOnly ? only : current;
    current = hasExcept ? nx.difference(current, except) : current;

    current.forEach((item) => {
      const key = `${name}_${item}`;
      items[key] = STD_RESOURCE_ACTIONS[item];
    });

    return { ...others, items };
  });
};

const httpRestConfig = (inHttpClient, inConfig) => {
  const apiConfig = {};
  const { items, resources } = inConfig;

  // api resources
  const resourceItems = normalizeResource(resources);
  const target = items.concat(resourceItems);

  target.forEach(function (item) {
    const request = item.request || inConfig.request;
    const prefix = item.prefix || inConfig.prefix || '';
    const suffix = item.suffix || inConfig.suffix || '';
    const baseURL = item.baseURL || inConfig.baseURL || `${location.protocol}//${location.host}`;
    // api items
    nx.each(item.items, function (key, _item) {
      const apiKey = prefix + key + suffix;
      apiConfig[apiKey] = function (inData, inOptions) {
        const data = Array.isArray(inData) ? nx.mix.apply(null, inData) : inData;
        const method = String(_item[0]).toLowerCase();
        const isGetStyle = GET_STYLE.includes(method);
        const [_subpath, _dataType] = request;
        const [urldata, payload] = dp(_item[1], data);
        const apiPath = nx.tmpl(_item[1], urldata);
        const options = nx.mix(null, _item[2], inOptions);
        const dataType = nx.get(options, 'dataType', _dataType);
        const params = isGetStyle ? payload : nx.DataTransform[dataType](payload);
        const url = baseURL + _subpath + apiPath;
        const contentType = nx.contentType(dataType);

        // when headers is null
        nx.mix(options, { headers: options.headers || {}, dataType });
        nx.mix(options.headers, { 'Content-Type': nx.contentType(dataType) });
        if (!contentType) delete options.headers['Content-Type'];

        return inHttpClient[method](url, params, options);
      };
    });
  });

  return apiConfig;
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports) {
  module.exports = httpRestConfig;
}

export default httpRestConfig;
