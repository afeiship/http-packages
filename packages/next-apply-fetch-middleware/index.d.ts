type FetchFn = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
type Middleware = (inFetch: FetchFn) => FetchFn;

interface NxStatic {
  applyFetchMiddleware: (middlewares: Middleware[]) => (fn: FetchFn) => FetchFn;
}
