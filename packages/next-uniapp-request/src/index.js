import nx from '@jswork/next';
import '@jswork/next-abstract-request';
import normalizeMinaOptions from '@jswork/normalize-mina-options';

const { isGetStyle } = nx.AbstractRequest;

const NxUniappRequest = nx.declare('nx.UniappRequest', {
  extends: nx.AbstractRequest,
  methods: {
    initClient: function () {
      this.httpRequest = function (inOptions) {
        const opts = normalizeMinaOptions({ minaFramework: 'uniapp', ...inOptions });
        const params = opts.params;
        const hasParam = params && typeof params !== 'undefined';
        const url = isGetStyle(opts.method) && hasParam ? nx.param(params, opts.url) : opts.url;

        return uni
          .request({ ...opts, url })
          .then((res) => {
            return {
              status: res.statusCode,
              data: res.data,
              original: res
            };
          })
          .catch((err) => {
            return {
              status: err.statusCode,
              data: err.data,
              original: err
            };
          });
      };
    }
  }
});

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = NxUniappRequest;
}

export default NxUniappRequest;
