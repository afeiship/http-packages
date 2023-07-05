import fn from '../src';

describe('api.basic', () => {
  test('case headers to header', () => {
    const opts = {
      headers: {
        'x-power-by': 'aric/http-schema1.0.0',
      },
    };
    expect(fn(opts)).toEqual({ header: { 'x-power-by': 'aric/http-schema1.0.0' } });
  });

  test('case Content-Type to lowercase', () => {
    const opts = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    expect(fn(opts)).toEqual({ header: { 'content-type': 'application/json' } });
  });

  test('case responseType json to text',()=>{
    const opts = {
      responseType: 'json',
    };

    expect(fn(opts)).toEqual({ responseType: 'text' });
  });
});
