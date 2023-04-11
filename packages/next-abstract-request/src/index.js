import nx from '@jswork/next';

import '@jswork/next-stub-singleton';
import '@jswork/next-parse-request-args';
import '@jswork/next-interceptor';
import '@jswork/next-abstract-request';
import '@jswork/next-content-type';

const MSG_IMPL = 'Must be implement.';
const GET_STYLE_ACTION = ['get', 'delete', 'head', 'options'];
const isGetStyle = (inMethod) => GET_STYLE_ACTION.includes(inMethod);

// type ResponseType =
// | 'urlencoded'
// | 'json'
// | 'formdata'
// | 'text'
// | 'raw'
// | 'blob'
// | 'arraybuffer'
// | 'document'
// | 'stream'
// | 'auto';

const defaults = {
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
      const payload = isGetStyle(inMethod) ? { params: inData } : { data: inData };
      const { dataType, responseType, ...options } = { ...this.opts, ...inOptions };
      const { transformRequest, transformResponse, transformError } = this.opts;
      const interceptor = this.interceptor;
      const contentType = nx.contentType(dataType);
      const headers = dataType && contentType ? { 'Content-Type': contentType } : {};
      const requestConfig = { url: inUrl, method: inMethod, headers, ...payload, ...options };

      // compose request:
      const requestTransformConfig = transformRequest(requestConfig);
      const requestComposeConfig = interceptor.compose(requestTransformConfig, 'request');

      return this.httpRequest(requestComposeConfig)
        .then((res) => {
          const responseTransformConfig = transformResponse(res);
          return interceptor.compose(responseTransformConfig, 'response');
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
