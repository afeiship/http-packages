const fetch = require('node-fetch');
const FormData = require('form-data');

require('../src');

jest.setTimeout(60 * 1000);

const MyRequest = nx.declare({
  extends: nx.AbstractRequest,
  methods: {
    initClient: function () {
      this.httpRequest = (inOptions) => {
        const { url, ...opts } = inOptions;
        return fetch(url, opts);
      };
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

  test('options: dataType - normal type', async () => {
    const client = MyRequest.getInstance();
    const TYPES = {
      urlencoded: 'application/x-www-form-urlencoded',
      json: 'application/json;charset=utf-8',
      text: 'text/plain',
      blob: 'application/octet-stream',
      document: 'application/xml'
    };

    const types = Object.keys(TYPES);

    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      const res = await client
        .post('https://httpbin.org/post', {
          data: { a: 1 },
          dataType: type
        })
        .then((r) => r.json());
      const resType = res.headers['Content-Type'];
      console.log('res/resType: ', resType);
      expect(resType).toContain(TYPES[type]);
    }
  });

  test('dataType: auto -> null(file/or normal)', async () => {
    const client = MyRequest.getInstance();
    const fd = new FormData();
    fd.append('file', 'test');

    // post file
    const res1 = await client
      .post('https://httpbin.org/post', {
        data: { file: fd },
        headers: { ...fd.getHeaders() }
      })
      .then((r) => r.json());
    const res1Type = res1.headers['Content-Type'];
    expect(res1Type).toContain('multipart/form-data');
  });

  test.only('http status code is ok', async () => {
    const client = MyRequest.getInstance();
    const res = await client.get('https://api.github.com/users/afeiship');
    expect(res.ok).toBe(true);
  });
});
