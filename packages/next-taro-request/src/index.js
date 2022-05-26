(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var defaults = { responseType: 'text' };
  var Taro = global.Taro || require('@tarojs/taro');
  var _ = require('@jswork/next-json');

  var normalize = function (inOptions) {
    var headers = inOptions.headers;
    var responseType = inOptions.responseType;
    headers['content-type'] = headers['Content-Type'];
    inOptions.data = inOptions.body;
    inOptions.header = headers;
    inOptions.responseType = responseType === 'json' ? 'text' : responseType;
    delete headers['Content-Type'];
    delete inOptions.headers;
    delete inOptions.body;
    return inOptions;
  };

  nx.taroRequest = function (inUrl, inOptions) {
    var options = nx.mix(null, { url: inUrl }, defaults, inOptions);
    options = normalize(options);
    return new Promise(function (resolve, reject) {
      Taro.request(
        nx.mix(
          {
            success: function (res) {
              var responseType = options.responseType;
              // 网络正常，但服务器异常返回，如返回一段xml/html
              res.data = responseType === 'text' ? nx.parse(res.data) : res.data;
              if (res.statusCode !== 200) return reject(res);
              resolve(res);
            },
            // {errMsg: "request:fail "}
            // 这种怦下说明网络有问题；nginx断了，网络断了等情况
            fail: function (err) {
              err.statusCode = -1;
              reject(err);
            }
          },
          options
        )
      );
    });
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.taroRequest;
  }
})();
