interface FetchOptions extends RequestInit {
  timeout?: number; // 单位：毫秒
  timeoutMessage?: string; // 超时错误的提示信息
}

export class TimeoutError extends Error {
  constructor(message: string = 'Request timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

function fetchWithTimeout(url: string, options: FetchOptions = {}): Promise<Response> {
  const { timeout, timeoutMessage, ...fetchOptions } = options;

  if (timeout !== undefined && timeout <= 0) {
    throw new Error('Timeout must be a positive number');
  }

  // 如果未设置 timeout，则直接调用原生 fetch
  if (!timeout) {
    return fetch(url, fetchOptions);
  }

  // 创建一个超时的 Promise
  const timeoutPromise = new Promise<Response>((_, reject) => {
    setTimeout(() => {
      reject(new TimeoutError(timeoutMessage));
    }, timeout);
  });

  // 使用 Promise.race 竞争 fetch 和 超时 Promise
  return Promise.race([fetch(url, fetchOptions), timeoutPromise]);
}

export default fetchWithTimeout;
