import axios from 'axios';
import nx from '@jswork/next';
import '@jswork/next-abstract-request';

const NxAxios = nx.declare('nx.Axios', {
  extends: nx.AbstractRequest,
  methods: {
    initClient: function () {
      this.httpRequest = function (inOptions) {
        const { url: _url, params, data: _data, $url, $query, $body, ...opts } = inOptions;
        const url = $url || nx.param($query || params, _url);
        const data = $body || _data;

        return axios
          .request({ url, data, ...opts })
          .then((res) => {
            return {
              status: res.status,
              data: res.data,
              original: res
            };
          })
          .catch((err) => {
            return Promise.reject({
              status: err.response.status,
              data: err.response.data,
              original: err
            });
          });
      };
    }
  }
});

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = NxAxios;
}

export default NxAxios;
