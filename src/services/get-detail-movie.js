import axios from 'axios';
import { apiKey, apiUrl, mediaDetailMapper, apiMediaTypes } from './index.js';

export const getDetailMovie = (id) => {
  const params = {
    api_key: apiKey,
    language: 'es-ES'
  };

  return axios.get(`${apiUrl}/${apiMediaTypes.MOVIE}/${id}`, { params }).then((response) => {
    const data = response.data || {};
    
    return mediaDetailMapper(data);
  });
};
