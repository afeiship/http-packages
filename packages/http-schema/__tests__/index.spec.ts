import httpSchema from '../src';

jest.setTimeout(50 * 1000);

describe('api.basic', () => {
  test('get-started case', async () => {
    const { api } = httpSchema({
      baseURL: 'https://api.github.com',
      request: ['', 'json'],
      items: [
        {
          items: {
            profile: ['get', '/users/afeiship'],
          },
        },
      ],
    });

    expect(api.profile).toBeDefined();
    const res = await api.profile();
    expect(res.data.login).toBe('afeiship');
  });

  // 1. test with params
  test('get case with params', async () => {
    const { api, client } = httpSchema({
      baseURL: 'https://api.github.com',
      request: ['', 'json'],
      items: [
        {
          items: {
            profile: ['get', '/users/{username}'],
          },
        },
      ],
    });

    expect(api.profile).toBeDefined();
    const res = await api.profile({ username: 'afeiship' });
    expect(res.data.login).toBe('afeiship');
  });

  // 2. httpbin curd case
  test('httpbin curd case', async () => {
    const { api } = httpSchema({
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

    expect(api.get).toBeDefined();
    expect(api.post).toBeDefined();
    expect(api.put).toBeDefined();
    expect(api.delete).toBeDefined();

    const res1 = await api.get({ a: 1 });
    expect(res1.data.url).toBe('https://httpbin.org/get?a=1');
    expect(res1.data.args).toEqual({ a: '1' });

    const res2 = await api.post({ a: 1 });
    expect(res2.data.args).toEqual({ a: '1' });

    const res3 = await api.put({ a: 1 });
    expect(res3.data.args).toEqual({ a: '1' });

    const res4 = await api.delete({ a: 1 });
    expect(res4.data.args).toEqual({ a: '1' });
  });

  // 3. httpbin curd case with prefix
  test('httpbin curd case with prefix', async () => {
    const { api } = httpSchema({
      baseURL: 'https://httpbin.org',
      request: ['', 'json'],
      items: [
        {
          prefix: 'v1_',
          items: {
            get: ['get', '/get'],
            post: ['post', '/post'],
            put: ['put', '/put'],
            delete: ['delete', '/delete'],
          },
        },
      ],
    });

    expect(api.v1_get).toBeDefined();
    expect(api.v1_post).toBeDefined();
    expect(api.v1_put).toBeDefined();
    expect(api.v1_delete).toBeDefined();
  });

  // Response formats Returns responses in different data formats
});
