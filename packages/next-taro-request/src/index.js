import nx from '@jswork/next';
import '@jswork/next-abstract-request';
import Taro from '@tarojs/taro';
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

        if (typeof Taro === 'undefined') {
          throw new Error('Please install @tarojs/taro first!');
        }

        return Taro
          .request({ ...opts, data, url })
          .then((res) => {
            const status = res.statusCode || res.status;
            const resobj = { status, data: res.data, original: res };
            // 小程序中的正常错误代码都会跑到这里来
            if (status >= 400) return Promise.reject(res);
            return resobj;
          })
          .catch((err) => {
            const status = err.statusCode || err.status;
            return Promise.reject({
              status,
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
