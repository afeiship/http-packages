type FetchFn = (inUrl: string, inOptions: RequestInit) => Response;
type Middleware = (inFetch: FetchFn) => FetchFn;

interface NxStatic {
  applyFetchMiddleware: (
    middlewares: Middleware[]
  ) => (inUrl: string, inOptions: RequestInit) => Response;
}
