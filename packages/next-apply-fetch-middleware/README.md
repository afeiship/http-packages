# next-apply-fetch-middleware
> Fetch meet middlewares.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-apply-fetch-middleware
```

## usage
```js
import '@jswork/next-apply-fetch-middleware';

const midJson = function (inFetch) {
  return function (url, options) {
    return inFetch(url, options).then(res => res.json());
  }
};

const midTimeout = function (inFetch) {
  return function (url, inOptions) {
    const controller = new AbortController();
    const options = Object.assign({ signal: controller.signal, timeout: 3 * 1000 }, inOptions);
    const timer = setTimeout(() => {
      controller.abort();
    }, options.timeout);

    return new Promise((resolve, reject) => {
      inFetch(url, options).then(res => {
        clearTimeout(timer);
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  }
};


const betterFetch = nx.applyFetchMiddleware([
  midJson,
  midTimeout
])(window.fetch);


// 1. return json
// 2. has timeout
betterFetch('https://api.github.com/users/afeiship', { timeout: 3 * 1000 }).then(res => {
  console.log(res);
});
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-apply-fetch-middleware/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-apply-fetch-middleware
[version-url]: https://npmjs.org/package/@jswork/next-apply-fetch-middleware

[license-image]: https://img.shields.io/npm/l/@jswork/next-apply-fetch-middleware
[license-url]: https://github.com/afeiship/next-apply-fetch-middleware/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-apply-fetch-middleware
[size-url]: https://github.com/afeiship/next-apply-fetch-middleware/blob/master/dist/next-apply-fetch-middleware.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-apply-fetch-middleware
[download-url]: https://www.npmjs.com/package/@jswork/next-apply-fetch-middleware
