(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var DEFAULT_OPTIONS = { debug: false };

  nx.fetchWithDebug = function (inFetch) {
    return function (inUrl, inOptions) {
      var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
      options.debug && console.log(inUrl, options);
      return inFetch(inUrl, options);
    };
  };

  if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
    module.exports = nx.fetchWithDebug;
  }
})();
