var httpRestConfig = require('../src');

describe('test group', () => {
  let apiService, http;

  beforeEach(function () {
    apiService = {};
    http = {
      get: function (inUrl, inData, inOptions) {
        return { url: inUrl, data: inData };
      },
      post: function (inUrl, inData, inOptions) {
        return {
          url: inUrl,
          data: inData,
        };
      },
      put: function (inUrl, inData, inOptions) {},
      delete: function (inUrl, inData, inOptions) {
        return {
          url: inUrl,
          data: inData,
        };
      },
    };
  });

  const config = {
    baseURL: 'http://dev.demo.com',
    request: ['/api/vi', 'json'],
    items: [
      {
        items: {
          upload: ['post', '/system/upload'],
          banner_delete: ['delete', '/system/banner/{id}'],
          banner_update: ['put', '/system/banner/{id}'],
        },
      },
      {
        host: 'http://dev2.demo.com',
        items: {
          login: ['post', '/system/login'],
          profile: ['get', '/system/profile'],
        },
      },
      {
        host: 'http://dev3.demo.com',
        prefix: 'dev3_',
        items: {
          login: ['post', '/system/login'],
        },
      },
    ],
  };

  test('all the apiService attach to context:', () => {
    apiService = httpRestConfig(http, config);
    expect(typeof apiService.upload).toBe('function');
    expect(typeof apiService.banner_delete).toBe('function');
    expect(typeof apiService.banner_update).toBe('function');
  });

  test('params data url json contentType', () => {
    apiService = httpRestConfig(http, config);
    const apiDelete = apiService.banner_delete({ id: 123 });
    const apiUpload = apiService.upload({ filename: 'test.txt' });
    // params:
    expect(apiDelete.url).toBe('http://dev.demo.com/api/vi/system/banner/123');
    expect(apiDelete.data).toBe(null);
    // normal:
    expect(apiUpload.url).toBe('http://dev.demo.com/api/vi/system/upload');
    expect(apiUpload.data).toEqual(JSON.stringify({ filename: 'test.txt' }));
  });

  test('items can change host', () => {
    apiService = httpRestConfig(http, config);
    const apiUpload = apiService.upload();
    const apiLogin = apiService.login();
    expect(apiLogin.url).toBe('http://dev2.demo.com/api/vi/system/login');
    expect(apiUpload.url).toBe('http://dev.demo.com/api/vi/system/upload');
  });

  test('prefix support', () => {
    apiService = httpRestConfig(http, config);
    const apiLogin = apiService.dev3_login({ abc: 111 });
    expect(apiLogin).toEqual({
      url: 'http://dev3.demo.com/api/vi/system/login',
      data: JSON.stringify({ abc: 111 }),
    });
  });

  test('get with qs in url should not stringify data', () => {
    apiService = httpRestConfig(http, config);
    const apiLogin = apiService.profile({ page: 1, size: 10 });
    expect(apiLogin).toEqual({
      url: 'http://dev2.demo.com/api/vi/system/profile',
      data: { page: 1, size: 10 },
    });
  });
});
