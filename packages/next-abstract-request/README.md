# next-abstract-request
> Standard abstract request.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-abstract-request
```

## apis
| api     | params                               | description                 |
| ------- | ------------------------------------ | --------------------------- |
| request | (inUrl, inMethod, inData, inOptions) | The entry api               |
| get     | (inUrl, inData, inOptions)           | The get api                 |
| post    | (inUrl, inData, inOptions)           | The post api                |
| delete  | (inUrl, inData, inOptions)           | The delete api              |
| put     | (inUrl, inData, inOptions)           | The put api                 |
| patch   | (inUrl, inData, inOptions)           | The patch api               |
| head    | (inUrl, inData, inOptions)           | The head api                |
| fetch   | (inConfig)                           | The only one args fetch api |



## usage
```js
import NxAbstractRequest from '@jswork/next-abstract-request';
// https://github.com/afeiship/next-fetch/blob/master/src/index.js

var DEFAULT_OPTIONS = {
  pipeStyle: 'fetch',
  dataType: 'json',
  responseType: 'json',
  interceptors: [],
  transformRequest: nx.stubValue,
  transformResponse: nx.stubValue,
  transformError: nx.stubValue
};

var BetterFetch = nx.declare('nx.BetterFetch', {
  extends: NxAbstractRequest,
  methods: {
    defaults: function () {
      return DEFAULT_OPTIONS;
    },
    request: function (inMethod, inUrl, inData, inOptions) {
      var options = nx.mix(null, this.options, inOptions);
      var isGET = inMethod === 'get';
      var body = isGET ? null : NxDataTransform[options.dataType](inData);
      var url = isGET ? nxParam(inData, inUrl) : inUrl;
      var headers = { 'Content-Type': nxContentType(options.dataType) };
      var config = nxDeepAssign({ method: inMethod, body: body, headers: headers }, options);
      var responseHandler = options.responseType
        ? nxToAction(options.responseType)
        : nx.stubValue;
      return options.fetch(url, config).then(responseHandler);
    }
  }
});
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-abstract-request/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-abstract-request
[version-url]: https://npmjs.org/package/@jswork/next-abstract-request

[license-image]: https://img.shields.io/npm/l/@jswork/next-abstract-request
[license-url]: https://github.com/afeiship/next-abstract-request/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-abstract-request
[size-url]: https://github.com/afeiship/next-abstract-request/blob/master/dist/next-abstract-request.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-abstract-request
[download-url]: https://www.npmjs.com/package/@jswork/next-abstract-request
