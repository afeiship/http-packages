(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nxToAction = nx.toAction || require('@jswork/next-to-action');
  var defaults = { responseType: 'json' };

  nx.fetchWithResponseType = function (inFetch) {
    return function (inUrl, inOptions) {
      var options = nx.mix(null, defaults, inOptions);
      var responseHandler = options.responseType ? nxToAction(options.responseType) : nx.stubValue;
      return inFetch(inUrl, options).then(responseHandler);
    };
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.fetchWithResponseType;
  }
})();
