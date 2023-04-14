interface NxStatic {
  DataTransform: {
    json: (data) => string;
    urlencoded: (data) => string;
    multipart: (data) => any;
    raw: (data) => any;
    transform: (dataType: string, data) => any;
  };
}
