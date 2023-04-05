# next-content-type
> Get correct content type for next.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-content-type
```

## usage
```js
import '@jswork/next-content-type';

nx.contentType('urlencoded'); 
// application/x-www-form-urlencoded

nx.contentType('multipart'); 
// multipart/form-data

nx.contentType('json'); 
// application/json;charset=utf-8

nx.contentType('raw'); 
// text/plain
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-content-type/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-content-type
[version-url]: https://npmjs.org/package/@jswork/next-content-type

[license-image]: https://img.shields.io/npm/l/@jswork/next-content-type
[license-url]: https://github.com/afeiship/next-content-type/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-content-type
[size-url]: https://github.com/afeiship/next-content-type/blob/master/dist/next-content-type.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-content-type
[download-url]: https://www.npmjs.com/package/@jswork/next-content-type