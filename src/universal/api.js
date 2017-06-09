import * as axios from 'axios';

// General API constants
export const URL = 'https://jsonplaceholder.typicode.com';
export const AUTH_HEADER = 'Authorization';

const requestConfig = {
  headers: {
    'Content-Type': 'text/plain',
  },
};

//
// API GET
//
export function get(endpoint) {
  const config = requestConfig;
  const requestUrl = URL + endpoint;

  const promise = new Promise((resolve, reject) => {
    axios
      .get(requestUrl, config)
      .then((response) => {
        const data = response;
        resolve(data);
      })
      .catch((response) => {
        reject(response);
      });
  });

  return promise;
}
