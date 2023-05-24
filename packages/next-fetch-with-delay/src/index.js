(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nxDelay = nx.delay || require('@jswork/next-delay');
  var DEFAULT_OPTIONS = { delay: 0 };

  nx.fetchWithDelay = function (inFetch) {
    return function (inUrl, inOptions) {
      var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
      var fetchRes = inFetch(inUrl, options);
      return options.delay ? fetchRes.then(nxDelay(options.delay)) : fetchRes;
    };
  };
  if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
    module.exports = nx.fetchWithDelay;
  }
})();
