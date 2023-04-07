import enhancedFetch from '../src';

jest.setTimeout(60 * 1000);

describe('api.basic', () => {
  test('normail single value case', async () => {
    const res = enhancedFetch('https://api.github.com/users/afeiship', { responseType: 'json' });
    console.log(res);
  });
});
