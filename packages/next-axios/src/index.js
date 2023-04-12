import axios from 'axios';
import nx from '@jswork/next';
import '@jswork/next-abstract-request';

const NxAxios = nx.declare('nx.Axios', {
  extends: nx.AbstractRequest,
  methods: {
    initClient: function () {
      this.httpRequest = function (inOptions) {
        return axios
          .request(inOptions)
          .then((res) => {
            return Promise.resolve({
              status: res.status,
              data: res.data,
              original: res
            });
          })
          .catch((err) => {
            return Promise.resolve({
              status: err.response.status,
              data: err.response.data,
              original: err
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
