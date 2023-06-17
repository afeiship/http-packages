import nx from '@jswork/next';
import '@jswork/next-abstract-request';
import normalizeMinaOptions from '@jswork/normalize-mina-options';

const NxUniappRequest = nx.declare('nx.UniappRequest', {
  extends: nx.AbstractRequest,
  methods: {
    initClient: function () {
      this.httpRequest = function (inOptions) {
        const opts = normalizeMinaOptions({ minaFramework: 'uniapp', ...inOptions });
        const { url: _url, params: _params, $query, $body } = opts;
        const params = $query || _params;
        const url = nx.param(params, url);
        if ($body) opts.data = $body;

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
