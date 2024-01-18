import nx from '@jswork/next';
import '@jswork/next-abstract-request';
import normalizeMinaOptions from '@jswork/normalize-mina-options';

const NxTaroRequest = nx.declare('nx.TaroRequest', {
  extends: nx.AbstractRequest,
  methods: {
    initClient: function() {
      this.httpRequest = function(inOptions) {
        const opts = normalizeMinaOptions({ minaFramework: 'taro', ...inOptions });
        const { url: _url, params: _params, $url, $query, $body } = opts;
        const params = $query || _params;
        const url = $url || nx.param(params, _url);
        const data = $body || opts.data;

        return Taro
          .request({ ...opts, data, url })
          .then((res) => {
            return {
              status: res.statusCode,
              data: res.data,
              original: res
            };
          })
          .catch((err) => {
            return Promise.reject({
              status: err.statusCode,
              data: err.data,
              original: err
            });
          });
      };
    }
  }
});

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = NxTaroRequest;
}

export default NxTaroRequest;
