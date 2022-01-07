import axios from 'axios';

import { apiUrl, apiKey } from '@services/constants';

// Spanish Language - Spain
const language = 'es-ES'; //  ISO 639-1
const region = 'ES'; //  ISO 3166-1

export const httpInterceptor = () => {
  // Add a request interceptor
  axios.interceptors.request.use(
    (request) => {
      // Do something before request is sent
      if (request.url.startsWith('/api/')) {
        request.url = request.url.replace(/\/api/, apiUrl);
        request.params = {
          api_key: apiKey,
          language,
          region,
          watch_region: region,
          ...request.params
        };

        return request;
      }

      return request;
    },
    (error) => {
      // Do something with request error
      console.error(error);
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response ? response.data : {};
    },
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      console.error(error);
      return Promise.reject(error);
    }
  );
};
