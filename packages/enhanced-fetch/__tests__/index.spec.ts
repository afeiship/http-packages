import enhancedFetch from '../src';
import { EnhancedRequestResponse, EnhancedRequestInit } from '../src/types';

jest.setTimeout(60 * 1000);

const ALL_MIDDLEWARES = {
  debug: true,
  destroyable: true,
  timeout: 5000,
  responseType: 'text',
} satisfies EnhancedRequestInit;

describe('api.basic', () => {
  test('API: normal fetch should get data', async () => {
    const res = (await enhancedFetch(
      'https://api.github.com/users/afeiship'
    )) as EnhancedRequestResponse;
    expect(typeof res.data).toBe('object');
    expect(res.data['login']).toBe('afeiship');
  });

  test('middleware: debug', async () => {
    const apiURL = 'https://httpbin.org/get';
    const DEBUG_STR = '\n :::::::::DEBUG::::::::: \n';
    // 监视 console.log 方法
    const consoleSpy = jest.spyOn(console, 'log');
    await enhancedFetch(apiURL, { debug: true });
    expect(consoleSpy).toHaveBeenCalledWith(DEBUG_STR);

    // active all middlewares
    await enhancedFetch(apiURL, ALL_MIDDLEWARES);
    expect(consoleSpy).toHaveBeenCalledWith(DEBUG_STR);

    // 停止监视 console.log 方法
    consoleSpy.mockRestore();
  });

  test('middleware: destroyable', async () => {
    const apiURL = 'https://httpbin.org/get';
    const promise = enhancedFetch(apiURL, { destroyable: true });
    // test promise.destroy method
    expect(typeof promise.destroy).toBe('function');
    // call method
    promise.destroy();
    // test promise is rejected, throw message contains 'aborted'
    await expect(promise).rejects.toThrow('aborted');

    // active all middlewares
    const promise2 = enhancedFetch(apiURL, ALL_MIDDLEWARES);
    // test promise.destroy method
    expect(typeof promise2.destroy).toBe('function');
    return Promise.resolve();
  });

  test('middleware: timeout', async () => {
    const apiURL = 'https://httpbin.org/get';
    const throwErr = async () => {
      await enhancedFetch(apiURL, { timeout: 5 });
    };
    await expect(throwErr()).rejects.toThrow('Timeout');
  });

  test('middleware: responseType', async () => {
    // default: json
    const apiURL = 'https://httpbin.org/get';
    const res = (await enhancedFetch(apiURL)) as EnhancedRequestResponse;
    expect(typeof res.data).toBe('object');
    expect(res.data.url).toBe(apiURL);
    // responseType: text
    const res2 = (await enhancedFetch(apiURL, { responseType: 'text' })) as EnhancedRequestResponse;
    expect(typeof res2.data).toBe('string');
    expect(res2.data).toContain(apiURL);
  });
});
