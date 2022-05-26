# http-rest-config
> A simple rest config for react project.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/http-rest-config
```

## expamle http:
```js
import nx from '@jswork/next-js-core2';
import NxAxios from '@jswork/next-axios';
const MyHttp = nx.declare({
  extends: NxAxios,
  methods: {
    getToken: function () {
      const {login} = AppBase.$.session;
      if (login) {
        return 'Bearer ' + login.token;
      }
      return null;
    },
    setRequestInterceptor: function () {
      this.axios.interceptors.request.use((config) => {
        const bearerToken = this.getToken();
        bearerToken && nx.mix(config.headers.common, {Authorization: bearerToken});
        return config;
      });
    },
    contentType: function () {
      return 'application/json; charset=utf-8';
    },
    transformParam: function (inData) {
      return JSON.stringify(inData);
    },
    toData: function (inResponse) {
      return inResponse.data;
    },
    error: function (inError) {
      //todo: search error:
    }
  }
});
```

## example config:
```js
export default {
  host: 'https://app.demo.com',
  request: ['/backend', 'urlencode'],
  items: [
    {
      items: {
        'login':  ['post', '/adminUser/login'],
        'logout': ['post', '/adminUser/logout']
      }
    },
    {
      request: ['/admin', 'json'],
      items: {
        'article_create': ['post', '/article/create'],
        'article_update': ['post', '/article/update'],
        'article_page':   ['get', '/article/page'],
      }
    },
    {
      request: ['/backend/pmall', 'json'],
      items: {
        'article_create': ['post', '/article/create'],
        'article_update': ['post', '/article/update'],
        'article_page':   ['get', '/article/page'],
      }
    }
  ]
};
```

## usage:
```js
import httpRestConfig from '@jswork/http-rest-config';

export default nx.declare({
  statics: {
    init () {
      httpRestConfig(this, MyHttp, APIS);
    }
  }
});
```

## todos
- [ ] 删除 `body` 中的多余参数

## license
Code released under [the MIT license](https://github.com/afeiship/http-rest-config/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/http-rest-config
[version-url]: https://npmjs.org/package/@jswork/http-rest-config

[license-image]: https://img.shields.io/npm/l/@jswork/http-rest-config
[license-url]: https://github.com/afeiship/http-rest-config/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/http-rest-config
[size-url]: https://github.com/afeiship/http-rest-config/blob/master/dist/http-rest-config.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/http-rest-config
[download-url]: https://www.npmjs.com/package/@jswork/http-rest-config
