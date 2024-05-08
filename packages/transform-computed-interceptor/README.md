# transform-computed-interceptor
> Transform request computed payload for http schema.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/transform-computed-interceptor
```

## usage
```js
import transformComputedInterceptor from '@jswork/transform-computed-interceptor';

const opts = {
  adapter: 'Axios',
  slim: true,
  interceptors: [...interceptorRequest, ...interceptorResponse, ...transformComputedInterceptor],
  transformResponse(inResponse) {
    return inResponse.data;
  },
};

nx.$api = httpSchema(schema, opts);
```

## types
```ts
/// <reference types="@jswork/transform-computed-interceptor/global.d.ts" />
```

## license
Code released under [the MIT license](https://github.com/afeiship/transform-computed-interceptor/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/transform-computed-interceptor
[version-url]: https://npmjs.org/package/@jswork/transform-computed-interceptor

[license-image]: https://img.shields.io/npm/l/@jswork/transform-computed-interceptor
[license-url]: https://github.com/afeiship/transform-computed-interceptor/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/transform-computed-interceptor
[size-url]: https://github.com/afeiship/transform-computed-interceptor/blob/master/dist/index.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/transform-computed-interceptor
[download-url]: https://www.npmjs.com/package/@jswork/transform-computed-interceptor
