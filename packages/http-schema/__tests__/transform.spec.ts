import httpSchema from '../src';

jest.setTimeout(50 * 1000);

describe('test transform', () => {
  test('Transform can unwrap res.data from response', async () => {
    const { api } = httpSchema({
      baseURL: 'https://httpbin.org',
      request: ['', 'json'],
      transform: (res) => res.data,
      items: [
        {
          items: {
            get: ['get', '/get'],
          },
        },
      ],
    });

    expect(api).toBeDefined();
    const res = await api.get();
    expect(res.url).toBe('https://httpbin.org/get');
  });
});
