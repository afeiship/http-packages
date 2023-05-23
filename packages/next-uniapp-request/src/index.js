import nx from '@jswork/next';
import '@jswork/next-abstract-request';
import normalizeMinaOptions from '@jswork/normalize-mina-options';

const NxUniappRequest = nx.declare('nx.UniappRequest', {
  extends: nx.AbstractRequest,
  methods: {
    initClient: function () {
      this.httpRequest = function (inOptions) {
        const opts = normalizeMinaOptions({ minaFramework: 'uniapp', ...inOptions });
        return uni.request(opts)
          .then((res) => {
            return {
              status: res.status,
              data: res.data,
              original: res
            };
          })
          .catch((err) => {
            return {
              status: err.response.status,
              data: err.response.data,
              original: err
            };
          });
      };
    }
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = NxUniappRequest;
}

export default NxUniappRequest;
