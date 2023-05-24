(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var defaults = { timeout: 0 };
  var TIMEOUT_ERROR = { type: 'timeout', message: 'Timeout: from `next-fetch-with-timeout`' };

  nx.fetchWithTimeout = function (inFetch) {
    return function (inUrl, inOptions) {
      var timer, ctrl;
      var options = nx.mix(null, defaults, inOptions);
      if (!options.timeout) return inFetch(inUrl, options);
      ctrl = new AbortController();
      options = nx.mix(null, { signal: ctrl.signal }, inOptions);
      timer = setTimeout(() => ctrl.abort(), options.timeout);

      return inFetch(inUrl, options)
        .finally(() => clearTimeout(timer))
        .catch(function (err) {
          if (err.type === 'aborted') throw TIMEOUT_ERROR;
          throw err;
        });
    };
  };

  if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
    module.exports = nx.fetchWithTimeout;
  }
})();
