import '../src';

describe('api.basic', () => {
  test('test inject fetch/FormData should be function', () => {
    expect(typeof globalThis.fetch).toBe('function');
    expect(typeof globalThis.FormData).toBe('function');
  });

  test('test fetch method: get request', async () => {
    const reqURL = 'https://httpbin.org/get';
    const res = await fetch(reqURL).then((r) => r.json());
    expect(res.url).toBe(reqURL);
  });
});
