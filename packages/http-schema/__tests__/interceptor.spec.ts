import httpSchema, { Interceptor } from '../src/index';

jest.setTimeout(50 * 1000);

const interceptors = [
  {
    type: 'request',
    fn: (config) => {
      config.headers['X-Request-By'] = 'http-schema';
      return config;
    },
  },
  {
    type: 'response',
    fn: (res) => {
      return res.data;
    },
  },
  {
    type: 'error',
    fn: (err) => {
      return Promise.reject(err);
    },
  },
] as Interceptor[];

describe.skip('interceptor', () => {
  test('get-started case', async () => {
    const { api } = httpSchema({
      baseURL: 'https://api.github.com',
      request: ['', 'json'],
      interceptors,
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
    expect(res.login).toBe('afeiship');
  });

  // 1. test with params
  test('get case with params', async () => {
    const { api, context } = httpSchema({
      baseURL: 'https://api.github.com',
      request: ['', 'json'],
      interceptors,
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
    expect(res.login).toBe('afeiship');
  });

  // 2. httpbin curd case
  test('httpbin curd case', async () => {
    const { api } = httpSchema({
      baseURL: 'https://httpbin.org',
      request: ['', 'json'],
      interceptors,
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
    const res = await api.get();
    expect(res.url).toBe('https://httpbin.org/get');
  });

  // 3. test config header
  test('test config header', async () => {
    const { api } = httpSchema({
      baseURL: 'https://httpbin.org',
      request: ['', 'json'],
      interceptors,
      items: [
        {
          items: {
            get: ['get', '/get'],
          },
        },
      ],
    });

    expect(api.get).toBeDefined();
    const res = await api.get();
    expect(res.headers['X-Request-By']).toBe('http-schema');
  });
});
