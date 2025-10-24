# normalize-rest-tpls
> Normalize rest templates for restful api.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
yarn add @jswork/normalize-rest-tpls
```

## usage
```js
import ApiResourceNormalizer from '@jswork/normalize-rest-tpls';

const normalizer = new ApiResourceNormalizer('rails');
const result = normalizer.normalize([
  'posts',
  '/sys/super/backend/params',
  '/sys/super/backend/adminUsers',
  ['admin_roles', '/sys/super/backend/adminRole'],
  { name: 'orders', only: ['index', 'show', 'cancel'] },
  { name: 'users', only: ['*', 'disable', 'enable'] },
  { name: 'roles', only: ['index', 'show'] },
  { name: 'permissions', subpath: '/sys/super/backend/imc' },
  { name: 'team_members', resName: 'imcTeamMember', subpath: '/sys/super/backend/imc' },
]);

console.log(result.items);
```

## license
Code released under [the MIT license](https://github.com/afeiship/@jswork/normalize-rest-tpls/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/normalize-rest-tpls
[version-url]: https://npmjs.org/package/@jswork/normalize-rest-tpls

[license-image]: https://img.shields.io/npm/l/@jswork/normalize-rest-tpls
[license-url]: https://github.com/afeiship/@jswork/normalize-rest-tpls/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/normalize-rest-tpls
[size-url]: https://github.com/afeiship/@jswork/normalize-rest-tpls/blob/master/dist/@jswork/normalize-rest-tpls.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/normalize-rest-tpls
[download-url]: https://www.npmjs.com/package/@jswork/normalize-rest-tpls
