(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var ProxyAgent = require('proxy-agent');
  var DEFAULT_OPTIONS = { proxy: null };

  nx.fetchWithProxy = function (inFetch) {
    return function (inUrl, inOptions) {
      var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
      options.agent = options.proxy ? new ProxyAgent(options.proxy) : null;
      return inFetch(inUrl, options);
    };
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.fetchWithProxy;
  }
})();
