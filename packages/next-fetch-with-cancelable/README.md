# next-fetch-with-cancelable
> Cancelable fetch middleware for next.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-fetch-with-cancelable
```

## usage
```js
import '@jswork/next-fetch-with-cancelable';

const cancelableFetch = nx.fetchWithCancelable(fetch);
const fetchResource = cancelableFetch('https://api.github.com/users/afeiship', { cancelable: true })
  .then(res=>res.json())
  .then((res) => {
    console.log('response:', res);
  })
  .catch((err) => {
    console.log(err);
  });

// abort
fetchResource.cancel();
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-fetch-with-cancelable/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-fetch-with-cancelable
[version-url]: https://npmjs.org/package/@jswork/next-fetch-with-cancelable

[license-image]: https://img.shields.io/npm/l/@jswork/next-fetch-with-cancelable
[license-url]: https://github.com/afeiship/next-fetch-with-cancelable/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-fetch-with-cancelable
[size-url]: https://github.com/afeiship/next-fetch-with-cancelable/blob/master/dist/next-fetch-with-cancelable.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-fetch-with-cancelable
[download-url]: https://www.npmjs.com/package/@jswork/next-fetch-with-cancelable
