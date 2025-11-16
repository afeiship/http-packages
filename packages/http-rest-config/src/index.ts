import nx from '@jswork/next';
import dp from '@jswork/http-data-parser';
import ApiResourceNormalizer from '@jswork/normalize-rest-tpls';
import '@jswork/next-tmpl';
import '@jswork/next-difference';

declare var wx: any;

export interface TransformApiArgs {
  key: string;
  name: string;
  prefix: string;
  suffix: string;
  method: string;
  params: any;
  url: string;
  data: any;
  options: any;
  httpClient: any;
  context: Promise<any>;
}

export type TemplateType = 'rails' | 'postify' | Record<string, any> | undefined;

export interface RestHttpConfig {
  transformApi?: (args: TransformApiArgs) => Promise<any>;
  priority?: number;
  templates?: TemplateType;
}

const normalizeResource = (inResources, inTemplates: TemplateType) => {
  const apiResourceNormalizer = new ApiResourceNormalizer(inTemplates);
  return apiResourceNormalizer.normalize(inResources);
};

const defaultRestOptions: RestHttpConfig = {
  templates: 'rails',
};

const httpRestConfig = (httpClient, inConfig, inOptions?: RestHttpConfig): any => {
  const apiConfig = {};
  const { items, resources } = inConfig;
  const { transformApi, templates } = { ...defaultRestOptions, ...inOptions };

  // api resources
  const resourceItems = normalizeResource(resources, templates!);
  const target = items.concat(resourceItems);

  target.forEach(function (item) {
    const request = item.request || inConfig.request;
    const prefix = item.prefix || inConfig.prefix || '';
    const suffix = item.suffix || inConfig.suffix || '';
    // const baseURL = item.baseURL || inConfig.baseURL || `${location.protocol}//${location.host}`;
    const baseURL = item.baseURL || inConfig.baseURL;
    const resources = item.resources || [];
    const resItems = normalizeResource(resources, templates);
    const mergedItems = Object.assign({}, resItems.items, item.items);

    // api items
    nx.each(mergedItems, function (key, _item) {
      const [_method, _path, _opts] = _item;
      const { tags, ...opts } = _opts || {};
      const name = prefix + key + suffix;

      apiConfig[name] = function (inData, inOptions) {
        const method = String(_method).toLowerCase();
        const [subpath, dataType] = request;
        const [params, data] = dp(_path, inData);
        const apiPath = nx.tmpl(_path, params);
        const options = nx.mix({ dataType }, opts, inOptions);
        const url = baseURL + subpath + apiPath;

        // for restful
        options.$key = key;
        options.$name = name;
        options.$tags = tags || [];

        const context = httpClient[method](url, data, options) as Promise<any>;
        const transformArgs = {
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
          context,
        };

        return transformApi ? transformApi(transformArgs) : context;
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
