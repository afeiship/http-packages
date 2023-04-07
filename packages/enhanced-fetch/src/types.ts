export type ResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer' | null;
export type FetchFn = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
export type MiddleWareFunction = (inFetch: FetchFn) => FetchFn;
export interface EnhancedRequestInit extends RequestInit {
  timeout?: number;
  destroyable?: boolean;
  responseType?: ResponseType;
}
