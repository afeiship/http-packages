(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nxStubSingleton = nx.stubSingleton || require('@jswork/next-stub-singleton');
  var nxParseRequestArgs = nx.parseArgs || require('@jswork/next-parse-request-args');
  var NxInterceptor = nx.Interceptor || require('@jswork/next-interceptor');
  var nxFetchWithResponseType = nx.fetchWithResponseType || require('@jswork/next-fetch-with-response-type');
  var TYPES = ['request', 'response', 'error'];
  var MSG_IMPL = 'Must be implement.';
  var defaults = {
    pipeStyle: 'fetch',
    dataType: 'json',
    responseType: 'json',
    interceptors: [],
    transformRequest: nx.stubValue,
    transformResponse: nx.stubValue,
    transformError: nx.stubValue
  };

  var NxAbstractRequest = nx.declare('nx.AbstractRequest', {
    statics: nx.mix(null, nxStubSingleton()),
    methods: {
      init: function (inOptions) {
        this.options = nx.mix(null, defaults, this.defaults(), inOptions);
        this.interceptor = new NxInterceptor({ items: this.options.interceptors, types: TYPES });
        this.httpRequest =
          this.options.pipeStyle === 'fetch' ? nxFetchWithResponseType(this.options.fetch) : this.options.fetch;
      },
      defaults: function () {
        return null;
      },
      request: function (inMethod, inUrl, inData, inOptions) {
        nx.error(MSG_IMPL);
      },
      'get,post,put,patch,delete,head,fetch': function (inMethod) {
        return function () {
          var inputArgs = [inMethod].concat(nx.slice(arguments));
          var args = nxParseRequestArgs(inputArgs, true);
          return this.request.apply(this, args);
        };
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAbstractRequest;
  }
})();
