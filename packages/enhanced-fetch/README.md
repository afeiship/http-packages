# enhanced-fetch
> Enhanced-fetch is a utility library that enriches the built-in fetch API with features such as support for response types, timeouts, and destroyable requests.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/enhanced-fetch
```

## usage
<img src="https://tva1.js.work/large/da432263ly1hcrexb1a6mj212g0jy794.jpg" width="800" alt="snapshot" />

```js
import enhancedFetch from '@jswork/enhanced-fetch';

const opts = {
  debug: true,
  timeout: 1000,
  resposneType: 'json'
};

const res = await enhancedFetch('https://api.github.com/users/afeiship', opts);
```

## license
Code released under [the MIT license](https://github.com/afeiship/enhanced-fetch/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/enhanced-fetch
[version-url]: https://npmjs.org/package/@jswork/enhanced-fetch

[license-image]: https://img.shields.io/npm/l/@jswork/enhanced-fetch
[license-url]: https://github.com/afeiship/enhanced-fetch/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/enhanced-fetch
[size-url]: https://github.com/afeiship/enhanced-fetch/blob/master/dist/enhanced-fetch.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/enhanced-fetch
[download-url]: https://www.npmjs.com/package/@jswork/enhanced-fetch
