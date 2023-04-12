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

    test('transform json', () => {
      const data = { title: 'the title' };
      const res1 = NxDataTransform.transform('json', data);
      const res2 = NxDataTransform.transform('unsupported', data);
      expect(res1).toBe('{"title":"the title"}');
      expect(res2).toBe(data);
    });
  });
})();
