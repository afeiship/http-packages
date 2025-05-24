import fn from '../src';

describe('Normal test cases', () => {
  test('number is equal 0/10/100/1000/10000', () => {
    expect(fn(0)).toEqual([0]);
    expect(fn(10)).toEqual([10, 0]);
    expect(fn(30)).toEqual([30, 0]);
    expect(fn(40)).toEqual([40, 0]);
    expect(fn(50)).toEqual([50, 0]);
    expect(fn(60)).toEqual([60, 0]);
    expect(fn(70)).toEqual([70, 0]);
    expect(fn(80)).toEqual([80, 0]);
    expect(fn(90)).toEqual([90, 0]);
    expect(fn(100)).toEqual([100, 0, 0]);
    expect(fn(1000)).toEqual([1000, 0, 0, 0]);
    expect(fn(10000)).toEqual([10000, 0, 0, 0, 0]);
  });
});
