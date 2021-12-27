import axios from 'axios';
import { apiKey, apiUrl, mediaDetailMapper, apiMediaTypes } from './index.js';

export const getDetailSerie = (id) => {
  const params = {
    api_key: apiKey,
    language: 'es-ES'
  };

  return axios.get(`${apiUrl}/${apiMediaTypes.TV}/${id}`, { params }).then((response) => {
    return mediaDetailMapper(response);
  });
};
