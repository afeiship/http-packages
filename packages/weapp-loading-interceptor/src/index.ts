declare var wx: any;

interface Options {
  interval?: number;
  ignoreKey?: string;
  onShow?: (opts: any) => void;
  onHide?: (opts: any) => void;
}

const defaults: Options = {
  interval: 500,
  ignoreKey: 'ignoreLoading',
  onShow: (opts) => {
    wx.showLoading({ title: '加载中', ...opts });
  },
  onHide: (opts) => {
    wx.hideLoading();
  },
};

class WhenLoading {
  private options: Options;
  private requestCount = 0;
  private loadingTimer;

  constructor(inOptions: Options) {
    this.options = Object.assign({}, defaults, inOptions);
  }

  create() {
    return [
      { type: 'request', fn: (opts) => this.whenRequest(opts) },
      { type: 'response', fn: (opts) => this.whenResponse(opts) },
    ];
  }

  whenRequest(inOptions) {
    const { onShow, ignoreKey } = this.options;
    const isIgnore = inOptions[ignoreKey!];
    this.loadingTimer && clearTimeout(this.loadingTimer);
    if (this.requestCount === 0 && !isIgnore) onShow!(inOptions?.loadingOptions);
    this.requestCount++;
    return inOptions;
  }

  whenResponse(inOptions) {
    const { onHide, interval } = this.options;
    this.requestCount--;
    this.loadingTimer = setTimeout(() => {
      if (this.requestCount === 0) onHide!(inOptions);
    }, interval);
    return inOptions;
  }
}

const createInterceptors = (options) => {
  const instance = new WhenLoading(options);
  return instance.create();
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = createInterceptors;
}

export default createInterceptors;
