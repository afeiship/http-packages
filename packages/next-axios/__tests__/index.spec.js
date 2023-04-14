require('../src');

const FormData = require('form-data');

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

  test('method: get + get with params', async () => {
    const httpClient = new nx.Axios();
    // without params
    const res1 = await httpClient.get('https://httpbin.org/get');
    expect(res1.data.url).toBe('https://httpbin.org/get');
    // with params
    const res2 = await httpClient.get('https://httpbin.org/get', { data: { a: 1 } });
    expect(res2.data.url).toBe('https://httpbin.org/get?a=1');

    const res3 = await httpClient.get('https://httpbin.org/get?id=1');
    expect(res3.data.url).toBe('https://httpbin.org/get?id=1');
  });

  test('method: post with data', async () => {
    const httpClient = new nx.Axios();
    const res = await httpClient.post('https://httpbin.org/post', { data: { a: 1 } });
    expect(res.data.json.a).toBe(1);
  });

  test('options: responseType - json/text', async () => {
    const httpClient = new nx.Axios();
    const res1 = await httpClient.get('https://httpbin.org/get');
    const res2 = await httpClient.get('https://httpbin.org/get', { responseType: 'text' });
    expect(typeof res1.data).toBe('object');
    expect(typeof res2.data).toBe('string');
  });

  test('options: dataType - normal type', async () => {
    const httpClient = new nx.Axios();
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
      const res = await httpClient.post('https://httpbin.org/post', {
        data: { a: 1 },
        dataType: type
      });
      const resType = res.data.headers['Content-Type'];

      console.log('type/resType: ', type, resType);
      if (type !== 'auto') {
        expect(resType).toContain(TYPES[type]);
      }
    }
  });

  test('dataType: auto -> null(file/or normal)', async () => {
    const httpClient = new nx.Axios();
    const fd = new FormData();
    fd.append('file', 'test');

    // post file
    const res1 = await httpClient.post('https://httpbin.org/post', {
      data: { file: fd },
      headers: { ...fd.getHeaders() }
    });
    const res1Type = res1.data.headers['Content-Type'];
    expect(res1Type).toContain('multipart/form-data');
  });

  test('interceptor: request', async () => {
    const httpClient = new nx.Axios({
      interceptors: [
        {
          fn: (opts) => {
            opts.url = opts.url + '?_=' + Date.now();
            return opts;
          },
          type: 'request'
        }
      ]
    });

    const { status, data } = await httpClient.get('https://httpbin.org/get');
    expect(data.url).toContain('_=');
  });

  test('interceptor: response', async () => {
    const httpClient = new nx.Axios({
      interceptors: [
        {
          fn: (res) => {
            res.data = res.data + ' - 1';
            return res;
          },
          type: 'response'
        }
      ]
    });

    const { status, data } = await httpClient.get('https://httpbin.org/get');
    expect(data).toContain(' - 1');
  });

  test('customize transformResponse should get json data(Axios)', async () => {
    const httpClient = new nx.Axios({
      transformResponse: (opts) => {
        return opts.data;
      }
    });

    const res1 = await httpClient.get('https://httpbin.org/get');
    expect(res1.url).toBe('https://httpbin.org/get');
    expect(typeof res1).toBe('object');

    // I want to get original data for this request
    const res2 = await httpClient.get('https://httpbin.org/get', {
      transformResponse: (opts) => opts
    });
    expect(res2.status).toBe(200);
    expect(res2.data.url).toBe('https://httpbin.org/get');
  });

  test('slim response', async () => {
    const httpClient = new nx.Axios({ slim: true });
    const res1 = await httpClient.get('https://httpbin.org/get');
    expect(res1.status).toBe(200);
    expect(res1.data).toBeDefined();
    expect(res1.original).toBeUndefined();
  });
});
