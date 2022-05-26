import NxFetch from '../../src/index';
import res1 from './interceptors/response/res1';
import removeUrlField from './interceptors/response/remove-url-field';
import normalizeDate from './interceptors/response/normalize-date';
import trimNull from './interceptors/response/trim-null';

const http = NxFetch.getInstance({
  transformRequest: ({ url, config }) => {
    console.log('url requst in global config', url);
    return { url, config };
  },
  transformResponse: ({ url, config, data }) => {
    console.log(url, config);
    return data;
  },
  interceptors: [
    { type: 'response', fn: res1 },
    { type: 'response', fn: removeUrlField },
    { type: 'response', fn: normalizeDate },
    { name: 'trim-nil', type: 'response', fn: trimNull }
  ]
});

// console.log(http);

function App() {
  // console.log(NxFetch);
  return (
    <div className="App">
      Hello App
      <button
        onClick={(e) => {
          const res = http
            .get('https://api.github.com/users/afeiship', {
              timeout: 10 * 1000,
              cancelable: true,
              transformRequest: ({ url, config }) => {
                console.log('url requst intance', url);
                return { url: url + `?ts=${Date.now()}`, config };
              }
            })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              if (err.type === 'timeout') {
                res.cancel();
                console.log(err);
              }
            });
        }}>
        Get api
      </button>

      <button
        onClick={(e) => {
          const res = http
            .get('https://api.github.com/users/afeiship', {})
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              if (err.type === 'timeout') {
                res.cancel();
                console.log(err);
              }
            });
        }}>
        Get api
      </button>
    </div>
  );
}

export default App;
