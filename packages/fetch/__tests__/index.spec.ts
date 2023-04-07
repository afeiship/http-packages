import '../src';

describe('api.basic', () => {
  test('test inject fetch is a function', () => {
    expect(typeof globalThis.fetch).toBe('function');
  });
});
