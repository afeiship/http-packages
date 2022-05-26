(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nxContentType = nx.contentType || require('@jswork/next-content-type');
  var defaults = { contentType: 'json' };

  nx.fetchWithContentType = function (inFetch) {
    return function (inUrl, inOptions) {
      var options = nx.mix(null, defaults, inOptions);
      var headers = { 'Content-Type': nxContentType(options.contentType) };
      options.headers = nx.mix(headers, options.headers);
      return inFetch(inUrl, options);
    };
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.fetchWithContentType;
  }
})();
