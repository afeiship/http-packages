interface FetchOptions extends RequestInit {
  timeout?: number; // 单位：毫秒
}

function fetchWithTimeout(url: string, options: FetchOptions = {}): Promise<Response> {
  const { timeout, ...fetchOptions } = options;

  // 如果未设置 timeout，则直接调用原生 fetch
  if (!timeout) {
    return fetch(url, fetchOptions);
  }

  // 创建一个超时的 Promise
  const timeoutPromise = new Promise<Response>((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request timed out')); // 英文提示
    }, timeout);
  });

  // 使用 Promise.race 竞争 fetch 和 超时 Promise
  return Promise.race([fetch(url, fetchOptions), timeoutPromise]);
}

export default fetchWithTimeout;
