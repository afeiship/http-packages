const NxFetch = require('../src');
const http = new NxFetch();

jest.setTimeout(30000);

describe('NxFetch.methods', function () {
  test.only('get should return res.login === afeiship', async () => {
    const res = await http.get('https://httpbin.org/get');
    expect(res.status).toBe(200);
    expect(res.data.url).toBe('https://httpbin.org/get');
  });
});
