# next-fetch-with-content-type
> Request middleware for contentType.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-fetch-with-content-type
```

## usage
```js
import '@jswork/next-fetch-with-content-type';

const betterFetch = nx.fetchWithContentType(fetch);
betterFetch('https://api.github.com/users/afeiship', { contentType: 'urlencoded' }).then(
  (res) => {
    // console.log(res);
  }
);
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-fetch-with-content-type/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-fetch-with-content-type
[version-url]: https://npmjs.org/package/@jswork/next-fetch-with-content-type

[license-image]: https://img.shields.io/npm/l/@jswork/next-fetch-with-content-type
[license-url]: https://github.com/afeiship/next-fetch-with-content-type/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-fetch-with-content-type
[size-url]: https://github.com/afeiship/next-fetch-with-content-type/blob/master/dist/next-fetch-with-content-type.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-fetch-with-content-type
[download-url]: https://www.npmjs.com/package/@jswork/next-fetch-with-content-type
