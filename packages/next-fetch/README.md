# next-fetch
> Abstract for browser or node.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-fetch
```

## options
| option            | type        | default      | description                                          |
| ----------------- | ----------- | ------------ | ---------------------------------------------------- |
| fetch             | Function    | window.fetch | Defult fetch implement                               |
| dataType          | String      | json         | json/raw/urlencoded/multipart                        |
| responseType      | String/Null | json         | json/text/blob/null                                  |
| interceptors      | Array       | []           | Multiple interceptors. eg: { type:'request', fn: xx} |
| transformRequest  | Function    | nx.stubValue | A special interceptor for only current request.      |
| transformResponse | Function    | nx.stubValue | A special interceptor for only current response.     |
| transformError    | Function    | nx.stubValue | A special interceptor for only current error.        |

## usage
```js
import NxFetch from '@jswork/next-fetch';

const http = NxFetch.getInstance({ responseType:'json' });

http.get('https://api.github.com/users/afeiship').then(res=>{
  console.log(res);
});

// {
//   login: 'afeiship',
//   id: 3038631,
//   node_id: 'MDQ6VXNlcjMwMzg2MzE=',
//   avatar_url: 'https://avatars2.githubusercontent.com/u/3038631?v=4',
    // .....
// }
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-fetch/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-fetch
[version-url]: https://npmjs.org/package/@jswork/next-fetch

[license-image]: https://img.shields.io/npm/l/@jswork/next-fetch
[license-url]: https://github.com/afeiship/next-fetch/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-fetch
[size-url]: https://github.com/afeiship/next-fetch/blob/master/dist/next-fetch.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-fetch
[download-url]: https://www.npmjs.com/package/@jswork/next-fetch
