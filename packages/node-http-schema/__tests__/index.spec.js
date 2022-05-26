(function () {
  const fn = require('../dist').default;

  describe('api.basic', () => {
    test('shema should be $api', (done) => {
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
