require('../src');

jest.setTimeout(60 * 1000);

describe('api.basic test', () => {
  test('nx.boilerplatePackage', function () {
    console.log('hello next');
  });
});
