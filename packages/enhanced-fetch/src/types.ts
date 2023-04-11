export type ResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer' | null;
export type DestroyablePromise<T> = { destroy?: () => void } & Promise<T>;

export interface EnhancedRequestResponse extends Response {
  ok: boolean;
  status: number;
  data: any;
}

export interface EnhancedRequestInit extends RequestInit {
  timeout?: number;
  destroyable?: boolean;
  debug?: boolean;
  responseType?: ResponseType;
}

export type FetchFn = (
  input: RequestInfo | URL,
  init?: EnhancedRequestInit
) => DestroyablePromise<EnhancedRequestResponse>;
export type MiddleWareFunction = (inFetch: FetchFn) => FetchFn;
