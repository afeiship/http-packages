(function () {
  const fn = require('../dist').default;

  describe('api.basic', () => {
    test('package basic case', () => {
      fn();
    });
  });
})();
