(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var DEFAULT_OPTIONS = { timeout: 0 };
  var TIMEOUT_ERROR = { type: 'timeout', message: 'Timeout: from `next-fetch-with-timeout`' };

  nx.fetchWithTimeout = function (inFetch) {
    return function (inUrl, inOptions) {
      var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
      if (!options.timeout) return inFetch(inUrl, options);
      var ctrl = new AbortController();
      options = nx.mix(null, { signal: ctrl.signal }, inOptions);
      var timer = setTimeout(function () {
        ctrl.abort();
      }, options.timeout);

      return inFetch(inUrl, options)
        .finally(function () {
          clearTimeout(timer);
        })
        .catch(function (err) {
          if (err.type === 'aborted') throw TIMEOUT_ERROR;
          throw err;
        });
    };
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.fetchWithTimeout;
  }
})();
