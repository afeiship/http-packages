export type ResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer' | null;
export type DestroyablePromise<T> = { destroy?: () => void } & Promise<T>;
export type FetchFn = (
  input: RequestInfo | URL,
  init?: RequestInit
) => DestroyablePromise<Response>;
export type MiddleWareFunction = (inFetch: FetchFn) => FetchFn;
export interface EnhancedRequestInit extends RequestInit {
  timeout?: number;
  destroyable?: boolean;
  debug?: boolean;
  responseType?: ResponseType;
}
