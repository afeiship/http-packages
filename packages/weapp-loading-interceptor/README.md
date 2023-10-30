# weapp-loading-interceptor
> Loading interceptor for weapp.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/weapp-loading-interceptor
```

## usage
```js
import weappLoadingInterceptor from '@jswork/weapp-loading-interceptor';

const weappLoadingIntercepotrs = createLoaingIntercepotrs({
  onShow: (opts) => {
    wx.showLoading({ title: '加载中', mask: true });
  },
  onHide: (opts) => {
    wx.hideLoading();
  },
});

const opts = {
  adapter: 'UniappRequest',
  slim: true,
  interceptors: [...interceptorRequest, ...interceptorResponse, ...weappLoadingIntercepotrs],
  transformResponse(inResponse) {
    return inResponse.data;
  },
};

nx.$api = httpSchema(schema, opts);
```

## license
Code released under [the MIT license](https://github.com/afeiship/weapp-loading-interceptor/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/weapp-loading-interceptor
[version-url]: https://npmjs.org/package/@jswork/weapp-loading-interceptor

[license-image]: https://img.shields.io/npm/l/@jswork/weapp-loading-interceptor
[license-url]: https://github.com/afeiship/weapp-loading-interceptor/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/weapp-loading-interceptor
[size-url]: https://github.com/afeiship/weapp-loading-interceptor/blob/master/dist/weapp-loading-interceptor.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/weapp-loading-interceptor
[download-url]: https://www.npmjs.com/package/@jswork/weapp-loading-interceptor
