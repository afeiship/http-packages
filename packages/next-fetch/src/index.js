import nx from '@jswork/next';
import enhancedFetch from '@jswork/enhanced-fetch';
import '@jswork/next-abstract-request';
import '@jswork/next-param';

const NxFetch = nx.declare('nx.Fetch', {
  extends: nx.AbstractRequest,
  methods: {
    initClient: function () {
      this.httpRequest = function (inOptions) {
        const { url, params, data, $query, $body, ...opts } = inOptions;
        const _url = nx.param($query || params, url);
        return enhancedFetch(_url, {
          body: $body || data,
          ...opts
        });
      };
    }
  }
});

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = NxFetch;
}

export default NxFetch;
