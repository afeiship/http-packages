(function () {
  const fn = require('../dist').default;
  const fetch = require('node-fetch');

  describe('api.basic', () => {
    test('package basic case', (done) => {
      global.fetch = fetch;

      const options = {
        transformResponse: ({ data }) => {
          return data;
        }
      };

      const $api = fn(
        {
          host: 'https://api.github.com',
          request: ['', 'json'],
          items: [
            {
              items: {
                login: ['get', '/users/afeiship']
              }
            }
          ]
        },
        options
      );

      $api.login().then((res) => {
        expect(res.login).toBe('afeiship');
        done();
      });
    });
  });
})();
