var dp = require('../dist/index.cjs').default;

require('@jswork/next-tmpl');

describe('test group', () => {
  test('parse url without tmpl vars', () => {
    var url = '/api/vi/system/login';
    var data = {
      name: 'afei',
      age: 108,
    };
    var res = dp(url, data);
    // console.log(res, nx.tmpl(url, null));
    expect(res).toEqual([null, { name: 'afei', age: 108 }]);
    expect(nx.tmpl(url, data)).toBe('/api/vi/system/login');
  });

  test('parse url with 1 param', () => {
    var url = '/api/vi/system/login/{name}';
    var data = {
      name: 'afei',
      age: 108,
    };
    var res = dp(url, data);
    // console.log(res, nx.tmpl(url, null));
    expect(res).toEqual([{ name: 'afei' }, { age: 108 }]);
    expect(nx.tmpl(url, data)).toBe('/api/vi/system/login/afei');
  });

  test('parse url with many param', () => {
    var url = '/api/vi/system/login/{name}/{age}';
    var data = {
      name: 'afei',
      age: 108,
    };
    var res = dp(url, data);
    // console.log(res, nx.tmpl(url, null));
    expect(res).toEqual([{ name: 'afei', age: 108 }, null]);
    expect(nx.tmpl(url, data)).toBe('/api/vi/system/login/afei/108');
  });

  test('parse url with with param and query string', () => {
    var url = '/api/vi/system/login/{name}/{age}?version={version}&age={age}';
    var data = {
      name: 'afei',
      age: 108,
      version: '1.0.0',
    };
    var res = dp(url, data);
    // console.log(res, nx.tmpl(url, null));
    expect(res).toEqual([
      { name: 'afei', age: 108, version: '1.0.0' },
      null
    ]);
    expect(nx.tmpl(url, data)).toBe(
      '/api/vi/system/login/afei/108?version=1.0.0&age=108'
    );
  });

  test('parse url with with param and post data', () => {
    var url = '/api/vi/system/login/{name}/{age}';
    var data = {
      name: 'afei',
      age: 108,
      version: '1.0.0',
    };
    var res = dp(url, data);
    // console.log(res, nx.tmpl(url, null));
    expect(res).toEqual([{ name: 'afei', age: 108 }, { version: '1.0.0' }]);
    expect(nx.tmpl(url, data)).toBe('/api/vi/system/login/afei/108');
  });

  test('parse url with with param + query + post-data', () => {
    var url = '/api/vi/system/login/{name}/{age}?version={version}&age={age}';
    var data = {
      name: 'afei',
      age: 108,
      version: '1.0.0',
      other1: 'x',
      other2: 'y',
    };

    var res = dp(url, data);

    expect(res).toEqual([
      { name: 'afei', age: 108, version: '1.0.0' },
      { other1: 'x', other2: 'y' }
    ]);

    expect(nx.tmpl(url, data)).toBe(
      '/api/vi/system/login/afei/108?version=1.0.0&age=108'
    );
  });
});
