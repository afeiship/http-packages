(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var httpSchema = require('@jswork/http-schema').default;

  require('@afeiship/next-rails-fetch');

  nx.railsHttpSchema = function (inConfig, inOptions) {
    const http = nx.RailsFetch.getInstance(inOptions);
    return httpSchema(inConfig, http);
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.railsHttpSchema;
  }
})();
