type DataType =
  | 'urlencoded'
  | 'json'
  | 'formdata'
  | 'text'
  | 'raw'
  | 'blob'
  | 'arraybuffer'
  | 'document'
  | 'stream'
  | 'auto';

interface NxStatic {
  contentType(type: DataType): string;
}
