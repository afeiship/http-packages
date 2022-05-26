(function () {
  require('../src');

  const fetch = require('node-fetch');

  jest.setTimeout(50 * 1000);

  // global.AbortController = AbortController;

  describe('api.basic test', () => {
    test('nx.fetchWithTimeout should caught err when timeout', (done) => {
      var url = 'https://reactnative.dev/movies.json';
      var newFetch = nx.fetchWithTimeout(fetch);
      newFetch(url, { timeout: 1 })
        .then((res) => res.json())
        .catch((err) => {
          console.log(err);
          expect(err.type).toBe('timeout');
        })
        .finally(() => {
          done();
        });
    });

    test('nx.fetchWithTimeout should get data without timeout:(timeout: 0)', (done) => {
      var url = 'https://reactnative.dev/movies.json';
      var newFetch = nx.fetchWithTimeout(fetch);
      newFetch(url)
        .then((res) => res.json())
        .then((res) => {
          expect(res.title).toBe('The Basics - Networking');
        })
        .finally(() => {
          done();
        });
    });
  });
})();
