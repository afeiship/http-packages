# next-fetch-with-timeout
> Fetch with timeout options.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-fetch-with-timeout
```

## usage
```js
import '@jswork/next-fetch-with-timeout';

const betterFetch = nx.fetchWithTimeout(fetch);
betterFetch('https://api.github.com/users/afeiship').then(res=>res.json()).then(res=>{
  console.log(res);
})
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-fetch-with-timeout/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-fetch-with-timeout
[version-url]: https://npmjs.org/package/@jswork/next-fetch-with-timeout

[license-image]: https://img.shields.io/npm/l/@jswork/next-fetch-with-timeout
[license-url]: https://github.com/afeiship/next-fetch-with-timeout/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-fetch-with-timeout
[size-url]: https://github.com/afeiship/next-fetch-with-timeout/blob/master/dist/next-fetch-with-timeout.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-fetch-with-timeout
[download-url]: https://www.npmjs.com/package/@jswork/next-fetch-with-timeout
