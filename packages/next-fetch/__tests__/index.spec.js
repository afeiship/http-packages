(function () {
  const NxFetch = require('../src');
  const nodeFetch = require('node-fetch');
  const http = new NxFetch({
    fetch: nodeFetch,
    transformResponse: ({ data }) => {
      return data;
    }
  });

  jest.setTimeout(30000);

  describe('NxFetch.methods', function () {
    test('get should return res.login === afeiship', function (done) {
      http.get('https://api.github.com/users/afeiship').then((res) => {
        expect(res.login).toBe('afeiship');
        done();
      });
    });

    test('request with a full object url', (done) => {
      http.get({ url: 'https://api.github.com/users/afeiship', method: 'get' }).then((res) => {
        expect(res.repos_url).toBe('https://api.github.com/users/afeiship/repos');
        done();
      });
    });

    test('request with transform should transform single request', (done) => {
      http
        .get('https://jsonplaceholder.typicode.com/todos/1', {
          transformRequest: (options) => {
            options.url = options.url + `?ts=${Date.now()}`;
            return options;
          },
          transformResponse: ({ data }) => {
            return { title: data.title + '_' + data.id };
          }
        })
        .then((res) => {
          expect(res).toEqual({ title: 'delectus aut autem_1' });
          done();
        });
    });
  });
})();
