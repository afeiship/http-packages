# nprogress-interceptor
> NPorgress interceptor for nx.$api.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/nprogress-interceptor
```

## usage
1. import css/js:
```html
<link rel="stylesheet" href="https://unpkg.com/nprogress@0.2.0/nprogress.css" />
<script src="https://unpkg.com/nprogress@0.2.0/nprogress.js"></script>
```

2. Use with `nx.$api`:
```js
import createLoaingIntercepotrs from '@jswork/nprogress-interceptor';

const loadingIntercepotrs = createLoaingIntercepotrs();

const opts = {
  adapter: 'Axios',
  slim: true,
  interceptors: [...interceptorRequest, ...interceptorResponse, ...loadingIntercepotrs],
  transformResponse(inResponse) {
    return inResponse.data;
  },
};

nx.$api = httpSchema(schema, opts);
```

## license
Code released under [the MIT license](https://github.com/afeiship/i18n-helper/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/i18n-helper
[version-url]: https://npmjs.org/package/@jswork/i18n-helper

[license-image]: https://img.shields.io/npm/l/@jswork/i18n-helper
[license-url]: https://github.com/afeiship/i18n-helper/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/i18n-helper
[size-url]: https://github.com/afeiship/i18n-helper/blob/master/dist/index.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/i18n-helper
[download-url]: https://www.npmjs.com/package/@jswork/i18n-helper
