import nx from '@jswork/next';

export default (res) => {
  const { data } = res;
  nx.forIn(data, (key, value) => {
    if (value === null || value === '') {
      delete data[key];
    }
  });
  return { ...res };
};
