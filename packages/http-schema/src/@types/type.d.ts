type DynamicApi = (...args: any[]) => Promise<any>;

interface NxStatic {
  $http: any;
  $api: any;
  $dapi: DynamicApi;
  $dapiFn: (...args: any[]) => DynamicApi;
}
