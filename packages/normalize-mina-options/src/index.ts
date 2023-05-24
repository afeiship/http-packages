export type MinaOptions = {
  minaFramework?: 'mina' | 'uniapp' | 'taro';
} & Record<string, any>;

const normalizeMinaOptions = (inOptions: MinaOptions) => {
  const { minaFramework, ...options } = inOptions;
  const headers = options.headers;
  const responseType = options.responseType;

  headers['content-type'] = headers['Content-Type'];
  options.data = options.body;
  options.header = headers;
  options.responseType = responseType === 'json' ? 'text' : responseType;
  delete headers['Content-Type'];
  delete options.headers;
  delete options.body;

  return options;
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = normalizeMinaOptions;
}

export default normalizeMinaOptions;
