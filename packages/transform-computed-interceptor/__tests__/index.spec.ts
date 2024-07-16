import fn from '../src';

describe('api.basic', () => {
  test('Unwrap computed properties', () => {
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

    const res = requestFn(mockOpts);
    expect(res).toBe(mockOpts);
    expect(res.data.name).toBe('aric');
    expect(res.data.age).toBe(25);
  });

  test('Computed with customized __getters__', () => {
    const requestFn = fn[0].fn;
    const mockOpts = {
      data: {
        id: 1,
        email: 'test@test.com',
        __computed__: {
          name: { first: 'aric', last: 'jones' },
          age: 25,
        },
        __getters__: (computed) => {
          return {
            age: computed.age,
            fullName: `${computed.name.first} ${computed.name.last}`,
          };
        },
      },
    };

    const res = requestFn(mockOpts);
    expect(res.data).toEqual({ id: 1, email: 'test@test.com', age: 25, fullName: 'aric jones' });
  });

  test('With __ui__ data, should delete when transform', () => {
    const requestFn = fn[0].fn;
    const mockOpts = {
      data: {
        id: 1,
        email: 'test@test.com',
        __computed__: {
          name: 'aric',
          age: 25,
        },
        __ui__: {
          password: '123456',
          is_editing: true,
        },
      },
    };

    const res = requestFn(mockOpts);
    expect(res.data).toEqual({ id: 1, email: 'test@test.com', name: 'aric', age: 25 });
    expect(res.data.__ui__).toBeUndefined();
  });
});
