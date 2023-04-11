import axios from 'axios';
import nx from '@jswork/next';
import '@jswork/next-abstract-request';

const GET_STYLE_ACTION = ['get', 'delete', 'head', 'options'];
const isGetStyle = (inMethod) => GET_STYLE_ACTION.includes(inMethod);

const NxAxios = nx.declare('nx.Axios', {
  extends: nx.AbstractRequest,
  methods: {
    request: function (inMethod, inUrl, inData, inOptions) {
      const extData = isGetStyle(inMethod) ? { params: inData } : { data: inData };
      return axios.request({
        url: inUrl,
        method: inMethod,
        data: extData,
        ...inOptions
      });
    }
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = NxAxios;
}

export default NxAxios;
