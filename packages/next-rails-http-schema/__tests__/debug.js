require('../src');

const options = {
  external: {
    baseUrl: 'https://www.fasimi.com',
    username: 'admin',
    password: '123123'
  },
  transformResponse: ({ data }) => {
    return data;
  }
};

const $api = nx.railsHttpSchema(
  {
    host: 'https://www.fasimi.com',
    request: ['', 'json'],
    items: [
      {
        items: {
          profile: ['get', '/rails_jwt_admin/profile']
        }
      }
    ]
  },
  options
);

$api.profile().then((res) => {
  console.log('profile: ', res);
});
