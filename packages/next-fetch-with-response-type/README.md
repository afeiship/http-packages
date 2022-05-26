# next-fetch-with-response-type
> Request middleware for responseType.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-fetch-with-response-type
```

## usage
```js
import '@jswork/next-fetch-with-response-type';

const betterFetch = nx.fetchWithResponseType(global.fetch);

betterFetch('https://jsonplaceholder.typicode.com/posts/1', { responseType:'json' }).then(res=>{
  console.log('res:', res)
})
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-fetch-with-response-type/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-fetch-with-response-type
[version-url]: https://npmjs.org/package/@jswork/next-fetch-with-response-type

[license-image]: https://img.shields.io/npm/l/@jswork/next-fetch-with-response-type
[license-url]: https://github.com/afeiship/next-fetch-with-response-type/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-fetch-with-response-type
[size-url]: https://github.com/afeiship/next-fetch-with-response-type/blob/master/dist/next-fetch-with-response-type.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-fetch-with-response-type
[download-url]: https://www.npmjs.com/package/@jswork/next-fetch-with-response-type
