# http-schema
> Http schema based on next-fetch.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/http-schema

// adapter: axios
yarn add axios @jswork/next-axios

// adapter: fetch(nodejs)
yarn add node-fetch @jswork/next-fetch

// adapter: fetch(bun/browser)
yarn add @jswork/next-fetch
```

## types
```ts
/// <reference types="@jswork/http-schema/dist/@types/type.d.ts" />
```

## usage
```js
import httpSchema from '@jswork/http-schema';

// use Axios
const $api1 = httpSchema({
  baseURL: "https://api.github.com",
  request: ["", "json"],
  resources: [
    {
      host: "http://dev2.demo.com",
      prefix: "v1_",
      name: "users",
      only: ["index"],
    },
    { prefix: "v2_", name: "posts" },
    { name: "roles", except: ["destroy"] },
    { name:'tags'},
    { name:'categories'},
    { name:'pictures'},
  ],
  items: [
    {
      items: {
        login: ["get", "/users/afeiship"],
      },
    },
  ],
}, { adapter: 'Axios'});

// use Fetch
import httpSchema from "@jswork/http-schema";
import "@jswork/next-fetch";

const $api2 = httpSchema(
  {
    baseURL: "https://api.github.com",
    request: ["", "json"],
    resources: [
      {
        host: "http://dev2.demo.com",
        prefix: "v1_",
        name: "users",
        only: ["index"],
      },
      { prefix: "v2_", name: "posts" },
      { name: "roles", except: ["destroy"] },
      { name: "tags" },
      { name: "categories" },
      { name: "pictures" },
    ],
    items: [
      {
        items: {
          login: ["get", "/users/afeiship"],
        },
      },
    ],
  },
  { adapter: "Fetch" }
);
```

## license
Code released under [the MIT license](https://github.com/afeiship/http-schema/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/http-schema
[version-url]: https://npmjs.org/package/@jswork/http-schema

[license-image]: https://img.shields.io/npm/l/@jswork/http-schema
[license-url]: https://github.com/afeiship/http-schema/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/http-schema
[size-url]: https://github.com/afeiship/http-schema/blob/master/dist/http-schema.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/http-schema
[download-url]: https://www.npmjs.com/package/@jswork/http-schema
