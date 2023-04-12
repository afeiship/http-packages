import axios from 'axios';
import nx from '@jswork/next';
import '@jswork/next-abstract-request';

const NxAxios = nx.declare('nx.Axios', {
  extends: nx.AbstractRequest,
  methods: {
    initClient: function () {
      this.httpRequest = function (inOptions) {
        const { slim, ...options } = inOptions;
        return axios
          .request(options)
          .then((res) => {
            const extra = slim ? null : { original: res };
            return Promise.resolve({
              status: res.status,
              data: res.data,
              ...extra
            });
          })
          .catch((err) => {
            const extra = slim ? null : { original: err };
            return Promise.resolve({
              status: err.response.status,
              data: err.response.data,
              ...extra
            });
          });
      };
    }
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = NxAxios;
}

export default NxAxios;
