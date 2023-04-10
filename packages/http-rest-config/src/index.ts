import dp from '@jswork/http-data-parser';
import nx from '@jswork/next';
import '@jswork/next-data-transform';
import '@jswork/next-tmpl';
import '@jswork/next-content-type';
import '@jswork/next-difference';

const GET_STYLE = ['get', 'delete', 'head', 'options'];
const STD_TEMPLATES = {
  index: ['get', '@'],
  show: ['get', '@/{id}'],
  create: ['post', '@'],
  update: ['put', '@/{id}'],
  destroy: ['delete', '@/{id}'],
} as const;

const normalizeResource = (inResources, inTemplates) => {
  if (!inResources?.length) return [];
  const templates = inTemplates || STD_TEMPLATES;
  const STD_KEYS = Object.keys(STD_TEMPLATES);
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
      items[key] = templates[item];
    });

    return { ...others, items };
  });
};

const httpRestConfig = (inHttpClient, inConfig) => {
  const apiConfig = {};
  const { items, resources, templates } = inConfig;

  // api resources
  const resourceItems = normalizeResource(resources, templates);
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
        const method = String(_item[0]).toLowerCase();
        const isGetStyle = GET_STYLE.includes(method);
        const [_subpath, _dataType] = request;
        const [params, payload] = dp(_item[1], inData);
        const apiPath = nx.tmpl(_item[1], params);
        const options = nx.mix(null, _item[2], inOptions);
        const dataType = nx.get(options, 'dataType', _dataType);
        const data = isGetStyle ? payload : nx.DataTransform[dataType](payload);
        const url = baseURL + _subpath + apiPath;
        const contentType = nx.contentType(dataType);

        // when headers is null
        nx.mix(options, { headers: options.headers || {}, dataType });
        nx.mix(options.headers, { 'Content-Type': nx.contentType(dataType) });
        if (!contentType) delete options.headers['Content-Type'];

        return inHttpClient.request(method, url, data, options);
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
