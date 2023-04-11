type FetchFn = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

interface NxStatic {
  applyFetchMiddleware: (
    middlewares: ((inFetch: FetchFn) => FetchFn)[]
  ) => (fn: FetchFn) => FetchFn;
}
