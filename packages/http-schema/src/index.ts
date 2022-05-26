import httpRestConfig from '@jswork/http-rest-config';

export default (inConfig, inRequest): any => {
  const context = {};
  httpRestConfig(context, inRequest, inConfig);
  return context;
};
