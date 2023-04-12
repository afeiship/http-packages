import nx from '@jswork/next';
import enhancedFetch from '@jswork/enhanced-fetch';
import '@jswork/next-abstract-request';
import '@jswork/next-param';

const NxFetch = nx.declare('nx.Fetch', {
  extends: nx.AbstractRequest,
  methods: {
    initClient: function () {
      this.httpRequest = function (inOptions) {
        const { url, params, data, ...opts } = inOptions;
        const _url = nx.param(params, url);
        return enhancedFetch(_url, {
          body: data,
          ...opts
        });
      };
    }
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = NxFetch;
}

export default NxFetch;
