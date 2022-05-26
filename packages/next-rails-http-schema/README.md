# next-rails-http-schema
> Rails http schema.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @afeiship/next-rails-http-schema
```

## usage
```js
import '@afeiship/next-rails-http-schema';

const options = {
  external: {
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

// profile:  { username: 'admin', email: '1290657123@qq.com' }
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-rails-http-schema/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@afeiship/next-rails-http-schema
[version-url]: https://npmjs.org/package/@afeiship/next-rails-http-schema

[license-image]: https://img.shields.io/npm/l/@afeiship/next-rails-http-schema
[license-url]: https://github.com/afeiship/next-rails-http-schema/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@afeiship/next-rails-http-schema
[size-url]: https://github.com/afeiship/next-rails-http-schema/blob/master/dist/next-rails-http-schema.min.js

[download-image]: https://img.shields.io/npm/dm/@afeiship/next-rails-http-schema
[download-url]: https://www.npmjs.com/package/@afeiship/next-rails-http-schema
