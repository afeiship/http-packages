import axios from 'axios';
import nx from '@jswork/next';
import '@jswork/next-abstract-request';
import '@jswork/next-json';

const preprocessResponse = (inData, inResponseType) => {
  if (inResponseType === 'json' && typeof inData === 'string') return nx.parse(inData);
  return inData;
};

const NxAxios = nx.declare('nx.Axios', {
  extends: nx.AbstractRequest,
  methods: {
    initClient: function () {
      this.httpRequest = function (inOptions) {
        const { responseType } = inOptions;
        return axios
          .request(inOptions)
          .then((res) => {
            const data = preprocessResponse(res.data, responseType);
            return Promise.resolve({
              status: res.status,
              data,
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
