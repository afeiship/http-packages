import nx from '@jswork/next';

const TYPES = {
  urlencoded: 'application/x-www-form-urlencoded',
  multipart: 'multipart/form-data',
  json: 'application/json;charset=utf-8',
  raw: 'text/plain',
  text: 'text/plain',
  blob: 'application/octet-stream',
  arraybuffer: 'application/octet-stream',
  stream: 'application/octet-stream',
  document: 'application/xml',
  auto: null
};

nx.contentType = function (inKey) {
  return TYPES[inKey] || TYPES.urlencoded;
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = nx.contentType;
}

export default nx.contentType;
