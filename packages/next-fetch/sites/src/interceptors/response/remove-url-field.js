import nx from '@jswork/next';

export default (res) => {
  const { data } = res;
  nx.forIn(data, (key, value) => {
    if (key.includes('url') || key.includes('public')) {
      delete data[key];
    }
  });
  return { ...res };
};
