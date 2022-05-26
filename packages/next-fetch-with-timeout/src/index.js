(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var DEFAULT_OPTIONS = { timeout: 0 };
  var TIMEOUT_ERROR = { type: 'timeout', message: 'Timeout: from `next-fetch-with-timeout`' };

  nx.fetchWithTimeout = function (inFetch) {
    return function (inUrl, inOptions) {
      var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
      if (!options.timeout) return inFetch(inUrl, options);

      return new Promise(function (resolve, reject) {
        var timer = setTimeout(function () {
          reject(TIMEOUT_ERROR);
        }, options.timeout);

        // finally can optimize code - but: https://caniuse.com/?search=finally
        inFetch(inUrl, options)
          .then(function (res) {
            clearTimeout(timer);
            resolve(res);
          })
          .catch(function (error) {
            clearTimeout(timer);
            reject(error);
          });
      });
    };
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.fetchWithTimeout;
  }
})();
