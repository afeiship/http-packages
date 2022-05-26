(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nodeFetch = require('node-fetch');
  var defaults = { fetch: nodeFetch, external: { username: null, password: null } };
  var STD_UA =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36';

  require('@afeiship/next-jwt-authorization');
  require('@jswork/next-fetch');

  var NxRailsFetch = nx.declare('nx.RailsFetch', {
    extends: nx.Fetch,
    methods: {
      defaults: function () {
        return defaults;
      },
      auth: function (inBaseURL) {
        var { username, password } = this.options.external;
        var url = inBaseURL + '/rails_jwt_admin/authentication';
        if (this.token) return Promise.resolve(this.token);
        return new Promise(function (resolve, reject) {
          nx.JwtAuthorization.auth(url, { username, password })
            .then((res) => resolve((this.token = res.token)))
            .catch(reject);
        });
      },
      request: function (inMethod, inUrl, inData, inOptions) {
        // skill: 这里不能用 this.base, 因为在 method 里面，又包了一层会导致 method.caller 变成 then里的匿名函数
        var self = this;
        var parent = this.$base;
        var baseURL = new URL(inUrl);
        return this.auth(baseURL.origin).then(function (token) {
          var auth = { Authorization: token, 'User-Agent': STD_UA };
          inOptions.headers = nx.mix(inOptions.headers, auth);
          return parent.request.call(self, inMethod, inUrl, inData, inOptions);
        });
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxRailsFetch;
  }
})();
