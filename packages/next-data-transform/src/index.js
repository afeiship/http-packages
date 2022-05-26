(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nxParam = nx.param || require('@jswork/next-param');

  var NxDataTransform = nx.declare('nx.DataTransform', {
    statics: {
      raw: nx.stubValue,
      __json__: function (inData) {
        return JSON.stringify(inData);
      },
      __urlencoded__: function (inData) {
        return nxParam(inData);
      },
      __multipart__: function (inData) {
        if (inData instanceof FormData) return inData;
        var data = new FormData();
        nx.forIn(inData, function (key, value) {
          data.append(key, value);
        });
        return data;
      },
      'json,urlencoded,multipart': function (inName) {
        return function (inData) {
          if (!inData || typeof inData !== 'object') return inData;
          return this['__' + inName + '__'].call(this, inData);
        };
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxDataTransform;
  }
})();
