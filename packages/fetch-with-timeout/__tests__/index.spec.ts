import fetchWithTimeout, { TimeoutError } from '../src';

describe('fetchWithTimeout', () => {
  let originalFetch: typeof fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.useRealTimers();
  });

  describe('参数验证', () => {
    test('当 timeout 为负数时应该抛出错误', () => {
      expect(() => {
        fetchWithTimeout('https://httpbin.org/delay/0.1 ', { timeout: -1 });
      }).toThrow('Timeout must be a positive number');
    });

    test('当 timeout 为 0 时应该抛出错误', () => {
      expect(() => {
        fetchWithTimeout('https://httpbin.org/delay/0.1 ', { timeout: 0 });
      }).toThrow('Timeout must be a positive number');
    });

    test('当未设置 timeout 时应该直接使用原生 fetch', async () => {
      const mockResponse = new Response('success');
      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      // 调用 fetchWithTimeout，未设置 timeout
      const response = await fetchWithTimeout('https://api.example.com ');

      // 断言返回值是否为模拟的响应
      expect(response).toBe(mockResponse);

      // 断言 fetch 是否被正确调用
      expect(global.fetch).toHaveBeenCalledWith('https://api.example.com ', {});
    });
  });
});
