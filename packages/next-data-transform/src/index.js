import nx from '@jswork/next';
import '@jswork/next-param';

const NxDataTransform = nx.declare('nx.DataTransform', {
  statics: {
    raw: nx.stubValue,
    __json__: function (inData) {
      return JSON.stringify(inData);
    },
    __urlencoded__: function (inData) {
      return nx.param(inData);
    },
    __multipart__: function (inData) {
      if (inData instanceof FormData) return inData;
      const fd = new FormData();
      nx.forIn(inData, function (key, value) {
        fd.append(key, value);
      });
      return data;
    },
    'json,urlencoded,multipart': function (inName) {
      return function (inData) {
        if (!inData || typeof inData !== 'object') return inData;
        return this['__' + inName + '__'].call(this, inData);
      };
    },
    transform: function (inDataType, inData) {
      const fn = this[inDataType];
      return fn ? fn.call(this, inData) : inData;
    }
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = NxDataTransform;
}

export default NxDataTransform;
