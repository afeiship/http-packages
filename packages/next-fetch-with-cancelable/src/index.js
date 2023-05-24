(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var DEFAULT_OPTIONS = {cancelable: false};
  var CANCELED_MAP = {};
  var id = 0;

  nx.fetchWithCancelable = function (inFetch) {
    return function (inUrl, inOptions) {
      var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
      if (!options.cancelable) return inFetch(inUrl, options);
      var ctrl = new AbortController();
      options = nx.mix(null, {signal: ctrl.signal}, inOptions);
      id = id + 1;

      CANCELED_MAP[id] = function () {
        return ctrl.abort();
      };

      Promise.prototype.__cancelable_id__ = id;
      Promise.prototype.cancel = function () {
        var res = (CANCELED_MAP[id] || nx.noop)();
        delete CANCELED_MAP[id];
        return res;
      };

      return inFetch(inUrl, options);
    };
  };

  if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
    module.exports = nx.fetchWithCancelable;
  }
})();
