declare global {
  namespace NodeJS {
    interface Global {
      fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
    }
  }
}

let stdFetch;

// nodejs 18+ has built-in fetch
// if (typeof process !== 'undefined' && process?.versions?.node) {
//   stdFetch = require('node-fetch').default;
//   const FormData = require('form-data');
//   global.fetch = stdFetch;
//   global.FormData = FormData;
// }

// other with fetch env:
if (typeof fetch !== 'undefined') stdFetch = fetch;

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = stdFetch;
}

export default stdFetch;
