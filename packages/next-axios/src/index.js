import axios from 'axios';
import nx from '@jswork/next';
import '@jswork/next-abstract-request';
import '@jswork/next-content-type';

const NxAxios = nx.declare('nx.Axios', {
  extends: nx.AbstractRequest,
  methods: {
    initClient: function () {
      this.httpRequest = axios.request;
    }
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = NxAxios;
}

export default NxAxios;
