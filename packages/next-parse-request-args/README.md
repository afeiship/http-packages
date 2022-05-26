# next-parse-request-args
> Request arguments parser.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-parse-request-args
```

## usage
```js
import '@jswork/next-parse-request-args';

// input:
// 1. (config)
// 2. (url)
// 3. (url, config)
// 4. (method, config)
// 5. (method, url)
// 6. (method, url, config)
// 7. (method, url, data, config)

// output:
{
  url: '/api/v1',
  method:'get',
  data: { query:1, zx:1 },
  headers: { 
    'Authorization': 'eyJhbGciOiJIUzUxMiJ9',
    'Content-Type': 'application/json' 
  }
}
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-parse-request-args/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-parse-request-args
[version-url]: https://npmjs.org/package/@jswork/next-parse-request-args

[license-image]: https://img.shields.io/npm/l/@jswork/next-parse-request-args
[license-url]: https://github.com/afeiship/next-parse-request-args/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-parse-request-args
[size-url]: https://github.com/afeiship/next-parse-request-args/blob/master/dist/next-parse-request-args.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-parse-request-args
[download-url]: https://www.npmjs.com/package/@jswork/next-parse-request-args
