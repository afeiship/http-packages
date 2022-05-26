# weapp-http-schema
> Http schema for weapp.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/weapp-http-schema
```

## usage
```js
import httpSchema from '@jswork/weapp-http-schema';

const apis = httpSchema({
  host: 'https://api.github.com',
  request: ['', 'json'],
  items: [
    {
      items: {
        profile: ['get', '/users/afeiship']
      }
    }
  ]
});

apis.profile().then((res) => {
  console.log(res);
});
```

## license
Code released under [the MIT license](https://github.com/afeiship/weapp-http-schema/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/weapp-http-schema
[version-url]: https://npmjs.org/package/@jswork/weapp-http-schema

[license-image]: https://img.shields.io/npm/l/@jswork/weapp-http-schema
[license-url]: https://github.com/afeiship/weapp-http-schema/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/weapp-http-schema
[size-url]: https://github.com/afeiship/weapp-http-schema/blob/master/dist/weapp-http-schema.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/weapp-http-schema
[download-url]: https://www.npmjs.com/package/@jswork/weapp-http-schema
