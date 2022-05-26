(function () {
  require('../src');

  const fetch = require('node-fetch');

  describe('api.basic test', () => {
    test('nx.fetchWithResponseType should wrap a fetch response with json', function (done) {
      const betterFetch = nx.fetchWithResponseType(fetch);

      betterFetch('https://api.github.com/users/afeiship').then((res) => {
        expect(typeof res).toBe('object');
        expect(res.login).toBe('afeiship');
        done();
      });
    });
  });
})();
