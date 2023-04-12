export type ResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer' | null;
export type DestroyablePromise<T> = { destroy?: () => void } & Promise<T>;

export interface EnhancedRequestResponse extends Response {
  status: number;
  data: any;
  original: any;
}

export interface EnhancedRequestInit extends RequestInit {
  timeout?: number;
  destroyable?: boolean;
  debug?: boolean;
  responseType?: ResponseType;
  slim?: boolean;
}

export type FetchFn = (input: RequestInfo | URL, init?: EnhancedRequestInit) => any;
export type MiddleWareFunction = (inFetch: FetchFn) => FetchFn;
