/**
 * Use case:
 * This method is used when form data, presented as an object within the __computed__ attribute needs to be expanded into multiple fields and added to the data object.
 * For instance, consider the below payload:
 * payload: {
 *   id: 1,
 *   email: 'xxx@xxx.xxx',
 *   __computed__: {
 *     name: 'John',
 *     age: 20,
 *    }
 *  }
 * The objective is to expand the data within the __computed__ attribute into separate fields i.e., name, and age, and add these to the main data object.
 * The final payload would appear as:
 * payload: {
 *    id: 1,
 *    email: 'xxx@xxx.xxx',
 *    name: 'John',
 *    age: 20,
 *  }
 *
 * Usage: the data object includes __computed__ and optionally __getters__ attributes.
 * The __getters__ attribute, if present, can offer a customised way to unfold the data.
 * If absent, the default unfolding into multiple fields will be performed.
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
