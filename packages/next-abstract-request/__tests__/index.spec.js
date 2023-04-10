const fetch = require('node-fetch');

require('../src');

jest.setTimeout(60 * 1000);

const MyRequest = nx.declare({
  extends: nx.AbstractRequest,
  methods: {
    request: function (inMethod, inUrl, inData, inOptions) {
      return fetch(inUrl, {
        method: inMethod,
        body: inData,
        ...inOptions
      });
    }
  }
});

describe('api.basic test', () => {
  test('MyRequest should has getInstance', function () {
    const httpClient1 = MyRequest.getInstance();
    const httpClient2 = MyRequest.getInstance();
    expect(httpClient1 === httpClient2).toBe(false);
  });

  test('MyRequest should has getSingleton', function () {
    const httpClient1 = MyRequest.getSingleton();
    const httpClient2 = MyRequest.getSingleton();
    expect(httpClient1 === httpClient2).toBe(true);
  });

  test('MyRequest should has get/post/put/patch/delete/head/options', function () {
    const client = MyRequest.getInstance();
    expect(client.get).toBeInstanceOf(Function);
    expect(client.post).toBeInstanceOf(Function);
    expect(client.put).toBeInstanceOf(Function);
    expect(client.patch).toBeInstanceOf(Function);
    expect(client.delete).toBeInstanceOf(Function);
    expect(client.head).toBeInstanceOf(Function);
    expect(client.options).toBeInstanceOf(Function);
  });

  test('get api should get data', async function () {
    const client = MyRequest.getInstance();
    const res = await client.get('https://api.github.com/users/afeiship');
    const data = await res.json();
    expect(data.login).toBe('afeiship');
  });
});
