import httpSchema from '../src';

jest.setTimeout(50 * 1000);

describe.skip('test harmony', () => {
  test('test single api request', async () => {
    httpSchema({
      baseURL: 'https://httpbin.org',
      request: ['', 'json'],
      harmony: true,
      items: [
        {
          items: {
            get: ['get', '/get'],
          },
        },
      ],
    });

    expect(nx['$api']).toBeDefined();
    expect(typeof nx['$api'].get === 'function').toBeTruthy();
  });
});
