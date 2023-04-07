require('../src');
const fetch = require('node-fetch');

describe('api.basic test', () => {
  test('nx.applyFetchMiddleware', function (done) {
    const midJson = function (inFetch) {
      return function (url, options) {
        console.log('json');
        return inFetch(url, options).then((res) => res.json());
      };
    };

    const midTimeout = function (inFetch) {
      return function (url, inOptions) {
        const controller = new AbortController();
        const options = Object.assign({ signal: controller.signal, timeout: 3 * 1000 }, inOptions);
        const timer = setTimeout(() => {
          controller.abort();
        }, options.timeout);

        return new Promise((resolve, reject) => {
          inFetch(url, options)
            .then((res) => {
              clearTimeout(timer);
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        });
      };
    };

    const betterFetch = nx.applyFetchMiddleware([midJson, midTimeout])(fetch);

    betterFetch('https://jsonplaceholder.typicode.com/todos', { timeout: 30 * 1000 }).then(
      (res) => {
        console.log(res);
        done();
      }
    );
  });
});
