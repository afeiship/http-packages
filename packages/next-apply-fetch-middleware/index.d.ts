type FetchFn = (inUrl: string, inOptions: RequestInit) => Response;

interface NxStatic {
  applyFetchMiddleware: (fns: FetchFn[]) => FetchFn;
}
