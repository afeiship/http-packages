(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var NxDataTransform = nx.DataTransform || require('@jswork/next-data-transform');
  var NxAbstractRequest = nx.AbstractRequest || require('@jswork/next-abstract-request');
  var nxDeepAssign = nx.deepAssign || require('@jswork/next-deep-assign');
  var nxContentType = nx.contentType || require('@jswork/next-content-type');
  var nxParam = nx.param || require('@jswork/next-param');
  var FormData = global.FormData || require('form-data');

  var NxFetch = nx.declare('nx.Fetch', {
    extends: NxAbstractRequest,
    methods: {
      request: function (inMethod, inUrl, inData, inOptions) {
        var self = this;
        var method = String(inMethod).toLowerCase();
        var options = nx.mix(null, this.options, inOptions);
        var isGET = method === 'get';
        var body = isGET ? null : NxDataTransform[options.dataType](inData);
        var isBodyFormData = body instanceof FormData;
        var headers = { 'Content-Type': nxContentType(options.dataType) };
        var path = isGET ? nxParam(inData, inUrl) : inUrl;
        var config = nxDeepAssign({ method, body, headers }, options);
        if (isBodyFormData) delete config.headers['Content-Type'];
        var composeRequest = options.transformRequest(this.interceptor.compose({ url: path, config }, 'request'));

        return new Promise(function (resolve, reject) {
          self
            .httpRequest(composeRequest.url, composeRequest.config)
            .then(function (response) {
              var params = nx.mix({ data: response }, composeRequest);
              var composeResponse = options.transformResponse(self.interceptor.compose(params, 'response'));
              resolve(composeResponse);
            })
            .catch(function (error) {
              var params = nx.mix({ data: error }, composeRequest);
              var composeError = options.transformError(self.interceptor.compose(params, 'error'));
              reject(composeError);
            });
        });
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxFetch;
  }
})();
