(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nxDeepAssign = nx.deepAssign || require('@jswork/next-deep-assign');
  var nxGuid = nx.deepAssign || require('@jswork/next-guid');

  nx.fetchWithRequestId = function (inFetch) {
    return function (inUrl, inOptions) {
      var headers = { 'request-id': nxGuid() };
      var options = nxDeepAssign({ headers: headers }, inOptions);
      return inFetch(inUrl, options);
    };
  };

  if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
    module.exports = nx.fetchWithRequestId;
  }
})();
