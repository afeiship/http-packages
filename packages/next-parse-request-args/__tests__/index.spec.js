(function () {
  require('../src');

  const expected = {
    url: '/github/api/v1/afeiship',
    method: 'get',
    data: { query: 1 },
    headers: {
      'Authorization': 'eyJhbGciOiJIUzUxMiJ9',
      'Content-Type': 'application/json'
    }
  };


  describe('api.basic test', () => {
    test('nx.parseRequestArgs 1 args is object', function () {
      var args = [{
        url: '/github/api/v1/afeiship',
        method: 'get',
        data: { query: 1 },
        headers: {
          'Authorization': 'eyJhbGciOiJIUzUxMiJ9',
          'Content-Type': 'application/json'
        }
      }];

      expect(nx.parseRequestArgs(args)).toEqual(expected);
    });

    test('nx.parseRequestArgs 1 args is string should default', function () {
      var args = ['/github/api/v1/afeiship'];
      expect(nx.parseRequestArgs(args)).toEqual({ method: 'get', url: '/github/api/v1/afeiship' });
    });


    test('nx.parseRequestArgs 2 args', () => {
      var args = [
        '/github/api/v1/afeiship',
        {
          method: 'get',
          data: { query: 1 },
          headers: {
            Authorization: 'eyJhbGciOiJIUzUxMiJ9',
            'Content-Type': 'application/json'
          }
        }
      ];

      var args2 = [
        'get',
        {
          url: '/github/api/v1/afeiship',
          data: { query: 1 },
          headers: {
            Authorization: 'eyJhbGciOiJIUzUxMiJ9',
            'Content-Type': 'application/json'
          }
        }
      ];

      var args3 = [
        'get',
        '/github/api/v1/afeiship'
      ];

      expect(nx.parseRequestArgs(args)).toEqual(expected);
      expect(nx.parseRequestArgs(args2)).toEqual(expected);
      expect(nx.parseRequestArgs(args3)).toEqual({ method: 'get', url: '/github/api/v1/afeiship' });
    });

    test('nx.parseRequestArgs 3 args', () => {
      var args = [
        'get',
        '/github/api/v1/afeiship',
        {
          data: { query: 1 },
          headers: {
            'Authorization': 'eyJhbGciOiJIUzUxMiJ9',
            'Content-Type': 'application/json'
          }
        }
      ];

      expect(nx.parseRequestArgs(args)).toEqual(expected);
    })

    test('nx.parseRequestArgs 4 args', () => {
      var args = [
        'get',
        '/github/api/v1/afeiship',
        { query: 1 },
        {
          headers: {
            'Authorization': 'eyJhbGciOiJIUzUxMiJ9',
            'Content-Type': 'application/json'
          }
        }
      ];

      expect(nx.parseRequestArgs(args)).toEqual(expected);
    });

    test('nx.parseRequestArgs 1 args & return array', () => {
      var args = [
        {
          url: '/github/api/v1/afeiship',
          method: 'get',
          data: { query: 1 },
          headers: {
            'Authorization': 'eyJhbGciOiJIUzUxMiJ9',
            'Content-Type': 'application/json'
          }
        }
      ];

      expect(
        nx.parseRequestArgs(args, true)
      ).toEqual([
        'get',
        '/github/api/v1/afeiship',
        { query: 1 },
        {
          headers: {
            'Authorization': 'eyJhbGciOiJIUzUxMiJ9',
            'Content-Type': 'application/json'
          }
        }
      ]);
    });


    test('nx.parseRequestArgs 0 args should throw error', () => {
      var args = [];
      expect(() => {
        nx.parseRequestArgs(args)
      }).toThrow();
    });

    test('nx.parseRequestArgs 5 args should throw error', () => {
      var args = [1, 2, 3, 4, 5];
      expect(() => {
        nx.parseRequestArgs(args)
      }).toThrow();
    });
  });
})();
