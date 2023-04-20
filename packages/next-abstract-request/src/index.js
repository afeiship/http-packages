import nx from '@jswork/next';

import '@jswork/next-stub-singleton';
import '@jswork/next-parse-request-args';
import '@jswork/next-interceptor';
import '@jswork/next-abstract-request';
import '@jswork/next-content-type';
import '@jswork/next-data-transform';

const MSG_IMPL = 'Must be implement.';
const GET_STYLE_ACTION = ['get', 'delete', 'head', 'options'];
const isGetStyle = (inMethod) => GET_STYLE_ACTION.includes(inMethod);

const defaults = {
  slim: false,
  dataType: 'json',
  responseType: 'json',
  interceptors: [],
  transformRequest: nx.stubValue,
  transformResponse: nx.stubValue,
  transformError: nx.stubValue
};

const NxAbstractRequest = nx.declare('nx.AbstractRequest', {
  statics: nx.mix(null, nx.stubSingleton()),
  methods: {
    init: function (inOptions) {
      this.opts = nx.mix(null, defaults, this.defaults(), inOptions);
      this.interceptor = new nx.Interceptor({ items: this.opts.interceptors });
      this.initClient();
    },
    initClient: function () {
      this.httpRequest = null;
      nx.error(MSG_IMPL);
    },
    defaults: function () {
      return null;
    },
    request: function (inMethod, inUrl, inData, inOptions) {
      // transformRequest, transformResponse only use once
      const { slim, dataType, transformRequest, transformResponse, transformError, ...options } = {
        ...this.opts,
        ...inOptions
      };
      const interceptor = this.interceptor;
      const contentType = nx.contentType(dataType);
      const headers = dataType && contentType ? { 'Content-Type': contentType } : {};
      const data = nx.DataTransform.transform(dataType, inData);
      const payload = isGetStyle(inMethod) ? { params: inData } : { data };

      // compose request:
      const requestConfig = { url: inUrl, method: inMethod, headers, ...payload, ...options };
      const requestTransformConfig = transformRequest(requestConfig);
      const requestComposeConfig = interceptor.compose(requestTransformConfig, 'request');

      return this.httpRequest(requestComposeConfig)
        .then((res) => {
          const compose4response = { config: requestComposeConfig, ...res };
          const composedResponse = interceptor.compose(compose4response, 'response');
          const result = transformResponse(composedResponse);
          const hasTransform = transformResponse !== nx.stubValue;
          if (hasTransform) return result;
          const { status, data, original } = result;
          return slim ? { status, data } : result;
        })
        .catch((err) => {
          // compose error:
          const errorComposeConfig = interceptor.compose(err, 'error');
          return transformError(errorComposeConfig);
        });
    },
    'get,post,put,patch,delete,head,options': function (inMethod) {
      return function () {
        const inputArgs = [inMethod].concat(nx.slice(arguments));
        const args = nx.parseRequestArgs(inputArgs, true);
        return this.request.apply(this, args);
      };
    }
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = NxAbstractRequest;
}

export default NxAbstractRequest;
