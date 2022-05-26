(function () {
  require('../src');

  const fetch = require('node-fetch');

  describe('api.basic test', () => {
    test('nx.fetchWithContentType', function (done) {
      const betterFetch = nx.fetchWithContentType(fetch);

      betterFetch('https://api.github.com/users/afeiship', { contentType: 'urlencoded' }).then(
        (res) => {
          done();
        }
      );
    });
  });
})();
