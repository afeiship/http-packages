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
{
  items: {
    // posts
    posts_index: ['get', '/posts'],
    posts_show: ['get', '/posts/{id}'],
    posts_create: ['post', '/posts'],
    posts_update: ['put', '/posts/{id}'],
    posts_destroy: ['delete', '/posts/{id}'],

    // params
    params_index: ['get', '/sys/super/backend/params'],
    params_show: ['get', '/sys/super/backend/params/{id}'],
    params_create: ['post', '/sys/super/backend/params'],
    params_update: ['put', '/sys/super/backend/params/{id}'],
    params_destroy: ['delete', '/sys/super/backend/params/{id}'],

    // admin_users
    admin_users_index: ['get', '/sys/super/backend/adminUsers'],
    admin_users_show: ['get', '/sys/super/backend/adminUsers/{id}'],
    admin_users_create: ['post', '/sys/super/backend/adminUsers'],
    admin_users_update: ['put', '/sys/super/backend/adminUsers/{id}'],
    admin_users_destroy: ['delete', '/sys/super/backend/adminUsers/{id}'],

    // admin_roles
    admin_roles_index: ['get', '/sys/super/backend/adminRole'],
    admin_roles_show: ['get', '/sys/super/backend/adminRole/{id}'],
    admin_roles_create: ['post', '/sys/super/backend/adminRole'],
    admin_roles_update: ['put', '/sys/super/backend/adminRole/{id}'],
    admin_roles_destroy: ['delete', '/sys/super/backend/adminRole/{id}'],

    // orders
    orders_index: ['get', '/orders'],
    orders_show: ['get', '/orders/{id}'],
    orders_cancel: ['post', '/orders/{id}/cancel'],

    // users
    users_index: ['get', '/users'],
    users_show: ['get', '/users/{id}'],
    users_create: ['post', '/users'],
    users_update: ['put', '/users/{id}'],
    users_destroy: ['delete', '/users/{id}'],
    users_enable: ['post', '/users/{id}/enable'],
    users_disable: ['post', '/users/{id}/disable'],

    // roles
    roles_index: ['get', '/roles'],
    roles_show: ['get', '/roles/{id}'],

    // permissions
    permissions_index: ['get', '/sys/super/backend/imc/permissions'],
    permissions_show: ['get', '/sys/super/backend/imc/permissions/{id}'],
    permissions_create: ['post', '/sys/super/backend/imc/permissions'],
    permissions_update: ['put', '/sys/super/backend/imc/permissions/{id}'],
    permissions_destroy: ['delete', '/sys/super/backend/imc/permissions/{id}'],

    // team_members
    team_members_index: ['get', '/sys/super/backend/imc/imcTeamMember'],
    team_members_show: ['get', '/sys/super/backend/imc/imcTeamMember/{id}'],
    team_members_create: ['post', '/sys/super/backend/imc/imcTeamMember'],
    team_members_update: ['put', '/sys/super/backend/imc/imcTeamMember/{id}'],
    team_members_destroy: ['delete', '/sys/super/backend/imc/imcTeamMember/{id}'],
  }
}
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
