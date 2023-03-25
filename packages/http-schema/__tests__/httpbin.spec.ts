import httpSchema from '../src';

jest.setTimeout(50 * 1000);
describe.skip('httpbin basic', () => {
  // 测试单个 API 的请求
  test('test single api request', async () => {
    const { api } = httpSchema({
      baseURL: 'https://httpbin.org',
      request: ['', 'json'],
      items: [
        {
          items: {
            profile: ['get', '/get'],
          },
        },
      ],
    });

    const response = await api.profile({ id: 123 });

    expect(response.status).toBe(200);
    expect(response.data.args.id).toBe('123');
  });

  // 测试多个 API 的请求
  test('test multiple api requests', async () => {
    const { api } = httpSchema({
      baseURL: 'https://httpbin.org',
      request: ['', 'json'],
      items: [
        {
          items: {
            profile: ['get', '/get'],
            create: ['post', '/post'],
          },
        },
      ],
    });

    const response1 = await api.profile({ id: 123 });
    expect(response1.status).toBe(200);
    expect(response1.data.args.id).toBe('123');

    const response2 = await api.create({ name: 'John', age: 30 });
    expect(response2.status).toBe(200);
    expect(response2.data.args.name).toBe('John');
    expect(response2.data.args.age).toBe('30');
  });
});
