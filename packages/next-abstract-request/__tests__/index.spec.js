const fetch = require('node-fetch');
const FormData = require('form-data');

require('../src');

jest.setTimeout(60 * 1000);

const MyRequest = nx.declare({
  extends: nx.AbstractRequest,
  methods: {
    initClient: function () {
      this.httpRequest = (inOptions) => {
        const { url, responseType, ...opts } = inOptions;
        return fetch(url, opts).then((original) => {
          const { ok, status } = original;
          const resType = ok ? responseType || 'json' : 'text';
          return original[resType]().then((data) => {
            return { status, data, original };
          });
        });
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
    expect(res.data.login).toBe('afeiship');
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
      const res = await client.post('https://httpbin.org/post', {
        data: { a: 1 },
        dataType: type
      });
      const resType = res.data.headers['Content-Type'];
      console.log('res/resType: ', resType);
      expect(resType).toContain(TYPES[type]);
    }
  });

  test('dataType: auto -> null(file/or normal)', async () => {
    const client = MyRequest.getInstance();
    const fd = new FormData();
    fd.append('file', 'test');

    // post file
    const res1 = await client.post('https://httpbin.org/post', {
      data: { file: fd },
      headers: { ...fd.getHeaders() }
    });
    const res1Type = res1.data.headers['Content-Type'];
    expect(res1Type).toContain('multipart/form-data');
  });

  test('http status code is ok', async () => {
    const client = MyRequest.getInstance();
    const res = await client.get('https://api.github.com/users/afeiship');
    expect(res.status).toBe(200);
  });

  test('http std response ok or not ok', async () => {
    const client = MyRequest.getInstance();
    const res_404 = await client.get('https://httpbin.org/get111');
    const res_200 = await client.get('https://httpbin.org/get');

    expect(res_404.status).toBe(404);
    expect(res_200.status).toBe(200);
  });

  test('interceptor: request', async () => {
    const client = MyRequest.getInstance({
      interceptors: [
        {
          type: 'request',
          fn: (opts) => {
            opts.headers['X-Test'] = 'test';
            return opts;
          }
        }
      ]
    });

    const res1 = await client.get('https://httpbin.org/get');
    expect(res1.data.headers['X-Test']).toBe('test');
  });

  test('interceptor: response', async () => {
    const client = MyRequest.getInstance({
      interceptors: [
        {
          type: 'response',
          fn: (res) => {
            res.data = { ...res.data, test: 'test' };
            return res;
          }
        }
      ]
    });

    const res1 = await client.get('https://httpbin.org/get');
    expect(res1.data.test).toBe('test');
  });

  test('transformRequest: override', async () => {
    const API_GET_URL = 'https://httpbin.org/get';
    const client = MyRequest.getInstance({
      transformRequest: (opts) => {
        opts.headers['Authorization'] = 'token';
        return opts;
      }
    });

    // with token, use default transformRequest
    const res1 = await client.get(API_GET_URL);
    expect(res1.data.headers['Authorization']).toBe('token');

    // without token ,use custom transformRequest
    const res2 = await client.get(API_GET_URL, {
      transformRequest: (opts) => {
        opts.headers['X-Test'] = 'test-key';
        return opts;
      }
    });

    expect(res2.data.headers['Authorization']).toBe(undefined);
    expect(res2.data.headers['X-Test']).toBe('test-key');
  });

  test.only('slim for response', async () => {
    const API_GET_URL = 'https://httpbin.org/get';
    const client1 = MyRequest.getInstance({ slim: true });
    const client2 = MyRequest.getInstance();

    // with token, use default transformRequest
    const res1 = await client1.get(API_GET_URL);
    // slim: true, response only have status/data
    expect(res1.status).toBeDefined();
    expect(res1.data).toBeDefined();
    expect(res1.original).toBeUndefined();

    // slim: false, response will have status/data/original
    const res2 = await client2.get(API_GET_URL);
    expect(res2.status).toBeDefined();
    expect(res2.data).toBeDefined();
    expect(res2.original).toBeDefined();
  });
});
