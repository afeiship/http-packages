(function () {
  const NxDataTransform = require('../src');

  describe('NxDataTransform.methods', function () {
    test('json', function () {
      const data = { key: 1, value: 2 };
      const res = NxDataTransform.json(data);
      expect(res).toBe('{"key":1,"value":2}');
    });

    test('urlencoded', function () {
      const data = { key: 1, value: 2 };
      const res = NxDataTransform.urlencoded(data);
      expect(res).toBe('key=1&value=2');
    });

    test('raw', () => {
      const res = NxDataTransform.raw('key=1&value=2');
      expect(res).toBe('key=1&value=2');
    });

    test('json with string value', () => {
      var data = '{"key":1,"value":2}';
      const res = NxDataTransform.json(data);
      expect(res).toBe('{"key":1,"value":2}');
    });

    test('urlencoded with null value', () => {
      var data = null;
      const res = NxDataTransform.urlencoded(data);
      expect(res).toBe(null);
    });
  });
})();
