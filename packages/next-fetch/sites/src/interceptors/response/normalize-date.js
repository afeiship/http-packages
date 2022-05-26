import nx from '@jswork/next';
import NxDate from '@jswork/next-date';
export default (res) => {
  const { data } = res;
  nx.forIn(data, (key, value) => {
    if (key.includes('_at')) {
      data[key] = NxDate.format(value, 'yyyy-mm-dd HH:MM:ss');
    }
  });
  return { ...res };
};
