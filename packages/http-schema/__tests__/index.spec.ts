import httpSchema from '../src';
import '@jswork/next-fetch';

jest.setTimeout(50 * 1000);

describe('api.basic', () => {
  test('adapter: axios - default', async () => {
    const $api: any = httpSchema({
      baseURL: 'https://httpbin.org',
      request: ['', 'json'],
      items: [
        {
          items: {
            get: ['get', '/get'],
          },
        },
      ],
    });

    const res_get = await $api.get();
    expect(res_get.data.headers['User-Agent']).toContain('axios');
  });

  test('adapter: fetch in nodejs env', async () => {
    const $api: any = httpSchema(
      {
        baseURL: 'https://httpbin.org',
        request: ['', 'json'],
        items: [
          {
            items: {
              get: ['get', '/get'],
            },
          },
        ],
      },
      { adapter: 'Fetch' }
    );
    const res = await $api.get();
    expect(res.data.headers['User-Agent']).toContain('fetch');
  });

  test('curd for httpbin(Fetch)', async () => {
    const opts = { adapter: 'Fetch' };
    const $api: any = httpSchema(
      {
        baseURL: 'https://httpbin.org',
        request: ['', 'json'],
        items: [
          {
            items: {
              get: ['get', '/get'],
              post: ['post', '/post'],
              put: ['put', '/put'],
              del: ['delete', '/delete'],
            },
          },
        ],
      },
      opts
    );

    const res_get = await $api.get({ id: 1 });
    const res_post = await $api.post({ title: 'title' });
    const res_put = await $api.put({ id: 2 });
    const res_del = await $api.del({ id: 3 });
    expect(res_get.data.url).toBe('https://httpbin.org/get?id=1');
    expect(res_post.data.json.title).toBe('title');
    expect(res_put.data.json.id).toBe(2);
    expect(res_del.data.url).toBe('https://httpbin.org/delete?id=3');
  });


  test('curd for httpbin(Axios)', async () => {
    const $api: any = httpSchema(
      {
        baseURL: 'https://httpbin.org',
        request: ['', 'json'],
        items: [
          {
            items: {
              get: ['get', '/get'],
              post: ['post', '/post'],
              put: ['put', '/put'],
              del: ['delete', '/delete'],
            },
          },
        ],
      },
    );

    const res_get = await $api.get({ id: 1 });
    const res_post = await $api.post({ title: 'title' });
    const res_put = await $api.put({ id: 2 });
    const res_del = await $api.del({ id: 3 });
    expect(res_get.data.url).toBe('https://httpbin.org/get?id=1');
    expect(res_post.data.json.title).toBe('title');
    expect(res_put.data.json.id).toBe(2);
    expect(res_del.data.url).toBe('https://httpbin.org/delete?id=3');
  });
});
