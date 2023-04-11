import nx from '@jswork/next';
import enhancedFetch from '@jswork/enhanced-fetch';
import '@jswork/next-abstract-request';

const NxFetch = nx.declare('nx.Fetch', {
  extends: nx.AbstractRequest,
  methods: {
    initClient: function () {
      this.httpRequest = function (inOptions) {
        const { url, ...opts } = inOptions;
        return enhancedFetch(url, opts);
      };
    }
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = NxFetch;
}

export default NxFetch;
