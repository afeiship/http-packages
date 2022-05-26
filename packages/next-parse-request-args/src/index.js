(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nxDelete = nx.delete || require('@jswork/next-delete');
  var DEFAULT_OPTIONS = { method: 'get' };
  var DEL_FIELDS = ['method', 'url', 'data'];
  var MSG_ERROR = 'The arguments.length should between 1 ~ 4.';
  var HTTP_METHOD = ['GET', 'POST', 'DELETE', 'PUT', 'CONNECT', 'HEAD', 'OPTIONS', 'TRACE'];
  var isValidMethod = function (arg) {
    return HTTP_METHOD.includes(arg.toUpperCase());
  };

  nx.parseRequestArgs = function (inArguments, inIsArray) {
    var args = inArguments;
    var length = args.length;
    var options = null;

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
        var config = typeof args[1] === 'string' ? { url: args[1] } : args[1];
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

    return !inIsArray
      ? options
      : [options.method, options.url, options.data, nxDelete(options, DEL_FIELDS)];
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.parseRequestArgs;
  }
})();
