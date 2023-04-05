import nx from '@jswork/next';

const DEFAULT_OPTIONS = { method: 'get' };
const MSG_ERROR = 'The arguments.length should between 1 ~ 4.';
const HTTP_METHOD = ['GET', 'POST', 'DELETE', 'PUT', 'CONNECT', 'HEAD', 'OPTIONS', 'TRACE'];
const isValidMethod = (arg) => HTTP_METHOD.includes(arg.toUpperCase());

nx.parseRequestArgs = function (inArguments, inIsArray) {
  const args = inArguments;
  const length = args.length;
  let options = null;

  // input:
  // 1. (config)
  // 2. (url)
  // 3. (url, config)
  // 4. (method, config)
  // 5. (method, url)
  // 6. (method, url, config)
  // 7. (method, url, data, config)

  switch (length) {
    case 1:
      options = typeof args[0] === 'string' ? { url: args[0] } : args[0];
      break;
    case 2:
      const config = typeof args[1] === 'string' ? { url: args[1] } : args[1];
      options = isValidMethod(args[0])
        ? nx.mix({ method: args[0] }, config)
        : nx.mix({ url: args[0] }, args[1]);

      break;
    case 3:
      options = nx.mix({ method: args[0], url: args[1] }, args[2]);
      break;
    case 4:
      options = nx.mix({ method: args[0], url: args[1], data: args[2] }, args[3]);
      break;
    default:
      options = null;
      nx.error(MSG_ERROR);
  }

  options = nx.mix(null, DEFAULT_OPTIONS, options);
  const { method, url, data, ...opts } = options;
  return !inIsArray ? options : [method, url, data, opts];
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = nx.parseRequestArgs;
}

export default nx.parseRequestArgs;
