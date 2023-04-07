import '../src';

describe('api.basic', () => {
  test('test inject fetch/FormData should be function', () => {
    expect(typeof globalThis.fetch).toBe('function');
    expect(typeof globalThis.FormData).toBe('function');
  });
});
