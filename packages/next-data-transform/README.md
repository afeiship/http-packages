# next-data-transform
> Data transform for next.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-data-transform
```

## apis
| api        | params | description                       |
| ---------- | ------ | --------------------------------- |
| raw        | data   | Do nothing                        |
| json       | data   | application/json;charset=utf-8    |
| urlencoded | data   | application/x-www-form-urlencoded |
| multipart  | data   | multipart/form-data               |

## usage
```js
import NxDataTransform from '@jswork/next-data-transform';

const data = { key: 1, value: 2 };

NxDataTransform.raw(data);          // { key: 1, value: 2 };
NxDataTransform.json(data);         // '{"key":1,"value":2}'
NxDataTransform.urlencoded(data);   // key=1&value=2
NxDataTransform.multipart(data);    // `[object FormData]`
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-data-transform/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-data-transform
[version-url]: https://npmjs.org/package/@jswork/next-data-transform

[license-image]: https://img.shields.io/npm/l/@jswork/next-data-transform
[license-url]: https://github.com/afeiship/next-data-transform/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-data-transform
[size-url]: https://github.com/afeiship/next-data-transform/blob/master/dist/next-data-transform.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-data-transform
[download-url]: https://www.npmjs.com/package/@jswork/next-data-transform
