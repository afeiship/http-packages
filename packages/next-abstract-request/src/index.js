import nx from '@jswork/next';

import '@jswork/next-stub-singleton';
import '@jswork/next-parse-request-args';
import '@jswork/next-interceptor';

const MSG_IMPL = 'Must be implement.';
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
    },
    defaults: function () {
      return null;
    },
    request: function (inMethod, inUrl, inData, inOptions) {
      nx.error(MSG_IMPL);
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
