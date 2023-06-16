import nx from '@jswork/next';
import '@jswork/next-abstract-request';
import normalizeMinaOptions from '@jswork/normalize-mina-options';

const GET_STYLE_ACTION = ['get', 'head', 'options'];
const isGetStyle = (inMethod) => GET_STYLE_ACTION.includes(inMethod);

const NxUniappRequest = nx.declare('nx.UniappRequest', {
  extends: nx.AbstractRequest,
  methods: {
    initClient: function () {
      this.httpRequest = function (inOptions) {
        const opts = normalizeMinaOptions({ minaFramework: 'uniapp', ...inOptions });
        const method = opts.method.toLowerCase();
        const isGET = isGetStyle(method);
        const params = opts.params;
        const hasParam = params && typeof params !== 'undefined';
        const url = isGET && hasParam ? nx.param(params, opts.url) : opts.url;

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
