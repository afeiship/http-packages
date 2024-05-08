import fn from '../src';

describe('api.basic', () => {
  test('normail single value case', () => {
    const requestFn = fn[0].fn;
    const mockOpts = {
      data: {
        id: 1,
        email: 'test@test.com',
        __computed__: {
          name: 'aric',
          age: 25,
        },
      },
    };

    requestFn(mockOpts);
    // expect(mockOpts.data.name).toBe('aric');
    // expect(mockOpts.data.age).toBe(25);
  });
});
