import nx from '@jswork/next';
import httpRestConfig from '@jswork/http-rest-config';
import '@jswork/next-axios';

const defaults = { adapter: 'Axios' };

const httpSchema = (inConfig, inOptions?) => {
  const { adapter, ...options } = { ...defaults, ...inOptions } satisfies { adapter: string };
  const http = nx[adapter].getInstance(options);
  return httpRestConfig(http, inConfig);
};

// for commonjs es5
if (typeof module !== 'undefined' && module.exports) module.exports = httpSchema;

// for es6
export default httpSchema;
