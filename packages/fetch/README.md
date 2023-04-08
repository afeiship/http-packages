# fetch
> Get standard fetch from any environment.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
# browser + bun
yarn add @jswork/fetch

# nodejs
yarn add @jswork/fetch node-fetch@2.6.7
```

## usage
> Usage1: import package.
```js
import fetch from '@jswork/fetch';

// as usually
const res = await fetch('https://api.github.com/users/afeiship');
console.log(res);
```

> Usage2: Or import to global(recommend)
```js
import '@jswork/fetch';

const res = await fetch('https://httpbin.org/get').then(r=>r.json())
console.log(res);
```

## license
Code released under [the MIT license](https://github.com/afeiship/fetch/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/fetch
[version-url]: https://npmjs.org/package/@jswork/fetch

[license-image]: https://img.shields.io/npm/l/@jswork/fetch
[license-url]: https://github.com/afeiship/fetch/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/fetch
[size-url]: https://github.com/afeiship/fetch/blob/master/dist/fetch.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/fetch
[download-url]: https://www.npmjs.com/package/@jswork/fetch
