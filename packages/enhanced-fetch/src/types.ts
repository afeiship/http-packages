export type ResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer' | null;
export type DestroyablePromise<T> = { destroy?: () => void } & Promise<T>;
export interface EnhancedRequestInit extends RequestInit {
  timeout?: number;
  destroyable?: boolean;
  debug?: boolean;
  responseType?: ResponseType;
}
export type FetchFn = (
  input: RequestInfo | URL,
  init?: EnhancedRequestInit
) => DestroyablePromise<Response>;
export type MiddleWareFunction = (inFetch: FetchFn) => FetchFn;
