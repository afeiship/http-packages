import nx from '@jswork/next';
import dp from '@jswork/http-data-parser';
import '@jswork/next-tmpl';
import '@jswork/next-difference';

declare var wx: any;

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

const httpRestConfig = (inHttpClient, inConfig): any => {
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
      const [_method, _path, _opts] = _item;
      const apiKey = prefix + key + suffix;

      apiConfig[apiKey] = function (inData, inOptions) {
        const method = String(_method).toLowerCase();
        const [subpath, dataType] = request;
        const [params, data] = dp(_path, inData);
        const apiPath = nx.tmpl(_path, params);
        const options = nx.mix({ dataType }, _opts, inOptions);
        const url = baseURL + subpath + apiPath;

        // for restful
        options.$name = apiKey;

        return inHttpClient[method](url, data, options);
      };
    });
  });

  return apiConfig;
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = httpRestConfig;
}

export default httpRestConfig;
