export type MinaOptions = {
  minaFramework?: 'mina' | 'uniapp' | 'taro';
} & Record<string, any>;

const normalizeMinaOptions = (inOptions: MinaOptions) => {
  const { minaFramework, ...options } = inOptions;
  const headers = options.headers;
  const responseType = options.responseType;

  // normalize content-type to lower case
  if (headers) {
    const contentType = headers['Content-Type'];
    if (contentType) headers['content-type'] = contentType;
    options.header = headers;

    // cleanup
    delete options.headers;
    delete headers['Content-Type'];
  }

  // responseType: 'text' | 'arraybuffer' | 'json'
  options.responseType = responseType === 'json' ? 'text' : responseType;

  // cleanup
  if (!options.responseType) delete options.responseType;

  return options;
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = normalizeMinaOptions;
}

export default normalizeMinaOptions;
