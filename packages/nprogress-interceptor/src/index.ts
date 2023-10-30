// extend window type
declare global {
  interface Window {
    NProgress: {
      start: () => void;
      done: () => void;
    }
  }
}

interface Options {
  interval?: number;
  ignoreKey?: string;
  nprogress?: any;
  onShow?: (opts: any) => void;
  onHide?: (opts: any) => void;
}

const defaults: Options = {
  interval: 500,
  ignoreKey: 'ignoreLoading',
  nprogress: window?.NProgress,
  onShow: (opts) => {
    const { nprogress } = defaults;
    nprogress?.start();
  },
  onHide: (opts) => {
    const { nprogress } = defaults;
    nprogress?.done();
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
    if (this.requestCount === 0 && !isIgnore) onShow!(inOptions);
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

export default createInterceptors;
