import httpSchema from '../src';

jest.setTimeout(50 * 1000);

describe('api.basic', () => {
  test('adapter: axios', async () => {
    const $api: any = httpSchema({
      baseURL: 'https://httpbin.org',
      request: ['', 'json'],
      items: [
        {
          items: {
            get: ['get', '/get'],
            post: ['post', '/post'],
            put: ['put', '/put'],
            delete: ['delete', '/delete'],
          },
        },
      ],
    });

    const res_get = await $api.get();
    console.log(res_get);
  });

  // test('adapter: fetch', async () => {});
});
