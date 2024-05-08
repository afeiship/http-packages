/**
 * 适用场景:
 * 页面中的一些 form 产生的表单数据为一个 object，存在于 __computed__ 属性中，需要将其展开为多个字段，并将其添加到 data 中。
 * 例如：
 * payload: {
 *   id: 1,
 *   email: 'xxx@xxx.xxx',
 *   __computed__: {
 *     name: '张三',
 *     age: 20,
 *    }
 *  }
 *   希望将 __computed__ 中的数据展开为 name 和 age 两个字段，并添加到 data 中，最终的 payload 如下：
 *   payload: {
 *      id: 1,
 *      email: 'xxx@xxx.xxx',
 *      name: '张三',
 *      age: 20,
 *    }
 *
 * 使用: data 中存在 __computed__ 和 __getters__ 属性，__getters__(这个是选填) 属性可自定义展开方式，默认为展开为多个字段。
 */

const defaultGetters = (computed: Record<string, any>) => {
  let result = {};
  for (let key in computed) {
    const value = computed[key];
    if (value && typeof value === 'object') {
      result = { ...result, ...value };
    } else {
      result[key] = value;
    }
  }
  return result;
};

const transformComputed = (opts) => {
  const { data } = opts;
  if (data?.__computed__) {
    const { __computed__: computed, __getters__, ...rest } = data;
    const getters = __getters__ || defaultGetters;
    const computedData = getters(computed);
    opts.data = { ...rest, ...computedData };
    delete opts.data.__computed__;
  }
  return opts;
};

export default [{ type: 'request', fn: transformComputed }];
