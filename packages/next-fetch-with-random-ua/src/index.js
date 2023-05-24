(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nxDeepAssign = nx.deepAssign || require('@jswork/next-deep-assign');
  var nxRandomUa = nx.randomUa || require('@jswork/next-random-ua');
  var defaults = { rua: false };

  nx.fetchWithRandomUa = function (inFetch) {
    return function (inUrl, inOptions) {
      var options = nx.mix(null, defaults, inOptions);
      var randomUa = { headers: { 'User-Agent': nxRandomUa() } };
      options.rua && (options = nxDeepAssign(randomUa, options));
      return inFetch(inUrl, options);
    };
  };

  if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
    module.exports = nx.fetchWithRandomUa;
  }
})();
