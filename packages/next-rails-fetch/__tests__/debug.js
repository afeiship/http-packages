const NxRailsFetch = require('../src');

// const data = { key: 1, value: 2 };
// expect(!!data).toBe(true);
var http = new NxRailsFetch({
  external: {
    username: 'admin',
    password: '123123'
  }
});

http.get('https://www.fasimi.com/rails_jwt_admin/profile').then((res) => {
  console.log(res);
});
