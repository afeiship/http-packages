# web-http-schema
> Http schema for web based on next-fetch.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/web-http-schema
```

## usage
```js
import httpSchema from '@jswork/web-http-schema';

const options = {
  transformResponse: ({ data }) => {
    return data;
  }
};

const $api = httpSchema(
  {
    host: 'https://api.github.com',
    request: ['', 'json'],
    items: [
      {
        items: {
          login: ['get', '/users/afeiship']
        }
      }
    ]
  },
  options
);

$api.login().then((res) => {
  // res
});
```

## license
Code released under [the MIT license](https://github.com/afeiship/web-http-schema/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/web-http-schema
[version-url]: https://npmjs.org/package/@jswork/web-http-schema

[license-image]: https://img.shields.io/npm/l/@jswork/web-http-schema
[license-url]: https://github.com/afeiship/web-http-schema/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/web-http-schema
[size-url]: https://github.com/afeiship/web-http-schema/blob/master/dist/web-http-schema.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/web-http-schema
[download-url]: https://www.npmjs.com/package/@jswork/web-http-schema
