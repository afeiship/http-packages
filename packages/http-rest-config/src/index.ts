import nx from '@jswork/next';
import dp from '@jswork/http-data-parser';
import '@jswork/next-tmpl';
import '@jswork/next-difference';

declare var wx: any;

interface RestHttpConfig {
  dynamicApi?: (args: any) => any;
}

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
  return inResources.map((res) => {
    const resource = typeof res === 'string' ? { name: res } : res;
    const { name, only, except, ...others } = resource;
    const items = {};
    const hasOnly = !!only?.length;
    const hasExcept = !!except?.length;
    let current = [...STD_KEYS];

    current = hasOnly ? only : current;
    current = hasExcept ? nx.difference(current, except) : current;

    current.forEach((item) => {
      const key = `${name}_${item}`;
      const tmpl = templates[item].slice(0);
      tmpl[1] = tmpl[1].replace('@', `/${name}`);
      items[key] = tmpl;
    });

    return { ...others, items };
  });
};

const httpRestConfig = (httpClient, inConfig, inOptions?: RestHttpConfig): any => {
  const apiConfig = {};
  const { items, resources, templates } = inConfig;
  const { dynamicApi } = { ...inOptions };

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
      const name = prefix + key + suffix;

      apiConfig[name] = function (inData, inOptions) {
        const method = String(_method).toLowerCase();
        const [subpath, dataType] = request;
        const [params, data] = dp(_path, inData);
        const apiPath = nx.tmpl(_path, params);
        const options = nx.mix({ dataType }, _opts, inOptions);
        const url = baseURL + subpath + apiPath;

        // for restful
        options.$key = key;
        options.$name = name;

        const dynamicArgs = {
          key,
          name,
          prefix,
          suffix,
          method,
          params,
          url,
          data,
          options,
          httpClient,
        };

        return dynamicApi ? dynamicApi(dynamicArgs) : httpClient[method](url, data, options);
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
