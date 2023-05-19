import nx from '@jswork/next';

const normalize = function (inOptions) {
  const headers = inOptions.headers;
  const responseType = inOptions.responseType;
  headers['content-type'] = headers['Content-Type'];
  inOptions.data = inOptions.body;
  inOptions.header = headers;
  inOptions.responseType = responseType === 'json' ? 'text' : responseType;
  delete headers['Content-Type'];
  delete inOptions.headers;
  delete inOptions.body;
  return inOptions;
};

const NxUniappRequest = nx.declare('nx.UniappRequest', {
  extends: nx.AbstractRequest,
  methods: {
    initClient: function () {
      this.httpRequest = function (inOptions) {
        const opts = normalize(inOptions);
        return uni.request
          .request(opts)
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
