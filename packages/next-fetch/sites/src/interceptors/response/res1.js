export default (res) => {
  const { data } = res;
  data.version = '1.0.0';
  return { ...res };
};
