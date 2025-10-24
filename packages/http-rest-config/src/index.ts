import nx from '@jswork/next';
import dp from '@jswork/http-data-parser';
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

// public recommed templates
const RAILS_TEMPLATES = {
  index: ['get', '@'],
  show: ['get', '@/{id}'],
  create: ['post', '@'],
  update: ['put', '@/{id}'],
  destroy: ['delete', '@/{id}'],
} as const;

// private
const POSTIFY_TEMPLATES = {
  index: ['post', '@/page'],
  show: ['post', '@/editInit'],
  create: ['post', '@/add'],
  update: ['post', '@/edit'],
  destroy: ['post', '@/delete'],
} as const;

const TEMPLATE_HOOKS = {
  rails: RAILS_TEMPLATES,
  postify: POSTIFY_TEMPLATES,
};

function toSnakeCase(str) {
  // 先处理大写字母前插入下划线（但避免在已有下划线后重复插入）
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2') // 小写+大写 → 小写_大写
    .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2') // 连续大写后接小写的情况，如 XMLHttp → XML_Http
    .toLowerCase() // 全部转为小写
    .replace(/_+/g, '_') // 合并多个连续下划线为一个
    .replace(/^_+|_+$/g, ''); // 去除首尾下划线
}

// /api/org/tenant/backend/staff  => /api/org/tenant/backend/ + staff
const getApiPath = (respath: string) => {
  const paths = respath.split('/');
  const name = paths.pop();
  const subpath = paths.join('/');

  return {
    name,
    nameSnakeCase: toSnakeCase(name),
    subpath,
  };
};

const normalizeResource = (inResources, inTemplates: TemplateType) => {
  if (!inResources?.length) return [];
  const isPredicatable = typeof inTemplates === 'string';
  const templates = isPredicatable ? TEMPLATE_HOOKS[inTemplates] : inTemplates || RAILS_TEMPLATES;
  const STD_KEYS = Object.keys(RAILS_TEMPLATES);
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
      const { name: _name, nameSnakeCase, subpath } = getApiPath(name);
      const key = `${nameSnakeCase}_${item}`;
      const tmpl = templates[item].slice(0);
      tmpl[1] = tmpl[1].replace('@', `${subpath}/${_name}`);
      items[key] = tmpl;
    });

    return { ...others, items };
  });
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
    const resourceItems = resItems.map((item) => item.items);
    const mergedItems = Object.assign({}, item.items, ...resourceItems);

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
