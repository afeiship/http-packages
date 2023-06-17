import axios from 'axios';
import nx from '@jswork/next';
import '@jswork/next-abstract-request';

const NxAxios = nx.declare('nx.Axios', {
  extends: nx.AbstractRequest,
  methods: {
    initClient: function () {
      this.httpRequest = function (inOptions) {
        const { url, params, data, $query, $body, ...opts } = inOptions;
        const _url = nx.param($query || params, url);

        return axios
          .request({ url: _url, data: $body || data, ...opts })
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

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = NxAxios;
}

export default NxAxios;
