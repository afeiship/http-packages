// 1-9
// quotient 商
// remainder 余数

const normalizeRestTpls = (inNumber: number | string): number[] => {
  const str = String(inNumber);
  const rdx = str.length - 1;
  return str.split('').map((n: string, idx) => {
    if (n === '0') return 0;
    return parseInt(n, 10) * Math.pow(10, rdx - idx);
  });
};

export default normalizeRestTpls;
