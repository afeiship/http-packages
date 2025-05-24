import normalizeMinaOptions from '@jswork/normalize-mina-options';

declare const wx: any;

function generateResponse(res: any) {
  let header = res.header || {};
  let config = res.config || {};
  return {
    ok: ((res.statusCode / 200) | 0) === 1, // 200-299
    status: res.statusCode,
    statusText: res.errMsg,
    url: config.url,
    clone: () => generateResponse(res),
    text: () => Promise.resolve(typeof res.data === 'string' ? res.data : JSON.stringify(res.data)),
    json: () => {
      if (typeof res.data === 'object') return Promise.resolve(res.data);
      let json = {};
      try {
        json = JSON.parse(res.data);
      } catch (err) {
        console.error(err);
      }
      return json;
    },
    blob: () => Promise.resolve(new Blob([res.data])),
    headers: {
      keys: () => Object.keys(header),
      entries: () => {
        let all: any[] = [];
        for (let key in header) {
          if (header.hasOwnProperty(key)) {
            all.push([key, header[key]]);
          }
        }
        return all;
      },
      get: (n) => header[n.toLowerCase()],
      has: (n) => n.toLowerCase() in header
    }
  };
}

const fetchMp = (url: string, options: any): Promise<any> => {
  const normalizeOptions = { ...options, minaFramework: 'mina' };
  const minaOptions = normalizeMinaOptions(normalizeOptions);
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method: minaOptions.method,
      data: minaOptions.data,
      header: minaOptions.headers,
      success: (res: any) => {
        resolve(generateResponse(res));
      },
      fail: (err: any) => {
        reject(generateResponse(err));
      }
    });
  });
};

export default fetchMp;
