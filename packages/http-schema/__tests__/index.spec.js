const fn = require('../dist').default;

describe('api.basic', () => {
  test('package basic case', () => {
    const ctx = fn({
      baseURL: 'https://api.github.com',
      request: ['', 'json'],
      items: [
        {
          items: {
            profile: ['get', '/users/afeiship']
          }
        }
      ]
    });

    console.log(ctx);
  });
});
