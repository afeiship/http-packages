const globalObject =
  typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
    ? globalThis
    : typeof global !== 'undefined'
    ? global
    : typeof self !== 'undefined'
    ? self
    : {};

let stdFetch;

if (typeof fetch !== 'undefined') stdFetch = fetch;

try {
  stdFetch = require('node-fetch').default;
  globalObject['fetch'] = stdFetch;
} catch (error) {
  console.error('To use fetch in Node.js environment, please install "node-fetch" package:');
  console.error('yarn add node-fetch@2.6.7');
  process.exit(1);
}


if (typeof module !== 'undefined' && module.exports) {
  module.exports = stdFetch;
}

export default stdFetch;
