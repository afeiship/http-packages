require('../src');

jest.setTimeout(60 * 1000);

describe('api.basic test', () => {
  test('NxAxios should have getInstance/getSingleton method', function () {
    expect(nx.Axios.getInstance).toBeDefined();
    expect(nx.Axios.getSingleton).toBeDefined();
  });

  test('NxAxios instance should have get/post/put/delete/head/options method', function () {
    const httpClient = new nx.Axios();
    const methods = 'get/post/put/delete/head/options';
    methods.split('/').forEach((method) => {
      expect(httpClient[method]).toBeDefined();
    });
  });

  test.only('method: get + get with params', async () => {
    const httpClient = new nx.Axios();
    // without params
    const res1 = await httpClient.get('https://httpbin.org/get');
    expect(res1.data.url).toBe('https://httpbin.org/get');
    // with params
    const res2 = await httpClient.get('https://httpbin.org/get', { a: 1 });
    console.log(res2.data)
    // expect(res2.data.url).toBe('https://httpbin.org/get?a=1');
  });
});
