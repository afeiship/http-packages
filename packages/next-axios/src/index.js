import axios from 'axios';
import nx from '@jswork/next';
import '@jswork/next-abstract-request';
import '@jswork/next-content-type';

const GET_STYLE_ACTION = ['get', 'delete', 'head', 'options'];
const isGetStyle = (inMethod) => GET_STYLE_ACTION.includes(inMethod);

const NxAxios = nx.declare('nx.Axios', {
  extends: nx.AbstractRequest,
  methods: {
    request: function (inMethod, inUrl, inData, inOptions) {
      const payload = isGetStyle(inMethod) ? { params: inData } : { data: inData };
      const { dataType, ...options } = inOptions;
      const contentType = nx.contentType(dataType);
      const headers = dataType && contentType ? { 'Content-Type': contentType } : {};

      return axios.request({
        url: inUrl,
        method: inMethod,
        headers,
        ...payload,
        ...options
      });
    }
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = NxAxios;
}

export default NxAxios;
