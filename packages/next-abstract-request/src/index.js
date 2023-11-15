import nx from '@jswork/next';

import '@jswork/next-stub-singleton';
import '@jswork/next-parse-request-args';
import '@jswork/next-interceptor';
import '@jswork/next-abstract-request';
import '@jswork/next-content-type';
import '@jswork/next-data-transform';

const MSG_IMPL = 'Must be implement.';
const GET_STYLE_ACTION = ['get', 'head', 'options'];
const isGetStyle = (inMethod) => GET_STYLE_ACTION.includes(inMethod.toLowerCase());

const defaults = {
  slim: false,
  resolveAble: false,
  dataType: 'json',
  responseType: 'json',
  interceptors: [],
  transformRequest: nx.stubValue,
  transformResponse: nx.stubValue
};

const NxAbstractRequest = nx.declare('nx.AbstractRequest', {
  statics: nx.mix(null, { isGetStyle }, nx.stubSingleton()),
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
      const { slim, resolveAble, dataType, transformRequest, transformResponse, ...options } = {
        ...this.opts,
        ...inOptions
      };
      const interceptor = this.interceptor;
      const contentType = nx.contentType(dataType);
      const headers = dataType && contentType ? { 'Content-Type': contentType } : {};
      const payload = isGetStyle(inMethod) ? { params: inData } : { data: inData };

      // compose request:
      const requestConfig = { url: inUrl, method: inMethod, headers, ...payload, ...options };
      const requestTransformConfig = transformRequest(requestConfig);
      const requestComposeConfig = interceptor.compose(requestTransformConfig, 'request');
      const lastRequestComposeConfig = {
        ...requestComposeConfig,
        data: nx.DataTransform.transform(dataType, requestComposeConfig.data)
      };

      return this.httpRequest(lastRequestComposeConfig)
        .then((res) => {
          const compose4response = { config: requestComposeConfig, ...res };
          const composedResponse = interceptor.compose(compose4response, 'response');
          return this._handleResponse(composedResponse, this.opts);
        })
        .catch((err) => {
          const { resolveAble } = this.opts;
          const result = this._handleResponse(err, this.opts);
          return resolveAble ? Promise.resolve(result) : Promise.reject(result);
        });
    },
    'get,post,put,patch,delete,head,options': function (inMethod) {
      return function () {
        const inputArgs = [inMethod].concat(nx.slice(arguments));
        const args = nx.parseRequestArgs(inputArgs, true);
        return this.request.apply(this, args);
      };
    },
    _handleResponse: function (inResponse, inOptions) {
      const { slim, transformResponse } = inOptions;
      const result = transformResponse(inResponse);
      const hasTransform = transformResponse !== nx.stubValue;
      if (hasTransform) return result;
      const { status, data } = reuslt;
      return slim ? { status, data } : reuslt;
    }
  }
});

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = NxAbstractRequest;
}

export default NxAbstractRequest;
