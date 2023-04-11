import fn from '../src';

describe('api.basic', () => {
  test('schma should be $api', async () => {
    const $api = fn({
      baseURL: 'https://api.github.com',
      request: ['', 'json'],
      items: [
        {
          items: {
            login: ['get', '/users/afeiship'],
          },
        },
      ],
    }) as any;

    const { data } = await $api.login();
    expect(data.login).toBe('afeiship');
  });
});
