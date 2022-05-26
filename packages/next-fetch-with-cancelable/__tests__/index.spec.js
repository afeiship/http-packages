(function () {
  require('../src');

  jest.setTimeout(50 * 10000);

  var fetch = require('node-fetch');

  describe('api.basic test', () => {
    test('nx.cancelableFetch should be canceled when cancelable: true', function (done) {
      var cancelableFetch = nx.fetchWithCancelable(fetch);
      var resource = cancelableFetch('https://api.github.com/users/afeiship', { cancelable: true })
        .then((res) => res.json())
        .catch((err) => {
          console.log('222');
          expect(err.type).toBe('aborted');
        })
        .finally(() => {
          console.log('333');
          done();
        });

      setTimeout(() => {
        console.log('111');
        expect(typeof resource.cancel).toBe('function');
        expect(resource.__cancelable_id__).toBe(1);
        resource.cancel();
      }, 108 * 0);
    });
  });
})();
