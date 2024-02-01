import nx from '@jswork/next';
import '@jswork/next-abstract-request';
import '@jswork/next-param';
import '@jswork/next-json';

// @references: https://wiki.greasespot.net/GM.xmlHttpRequest

const NxGmXhr = nx.declare('nx.GmXhr', {
  extends: nx.AbstractRequest,
  methods: {
    initClient: function() {
      this.httpRequest = function(inOptions) {
        const { responseType, url, params, data, $url, $query, $body, ...opts } = inOptions;
        const _url = $url || nx.param($query || params, url);
        return new Promise((resolve, reject) => {
          const rejectHandler = function(err) {
            const { status } = err;
            reject({ data: err, status, original: err });
          };

          GM_xmlhttpRequest({
            method: opts.method || 'GET',
            url: _url,
            data: $body || data,
            headers: opts.headers,
            onload: function(response) {
              const res = responseType === 'json' ? nx.parse(response.responseText) : response.responseText;
              resolve({ data: res, status: response.status, original: response });
            },
            onerror: rejectHandler,
            onabort: rejectHandler,
            ontimeout: rejectHandler
          })
        })
        // return enhancedFetch(_url, {
        //   body: $body || data,
        //   ...opts
        // }).then((res) => {
        //   const status = res.status;
        //   if (status >= 400) return Promise.reject(res);
        //   return res;
        // })
      };
    }
  }
});

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = NxGmXhr;
}

export default NxGmXhr;
