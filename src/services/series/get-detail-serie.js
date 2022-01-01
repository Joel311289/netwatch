import axios from 'axios';
import { apiKey, apiUrl, mediaDetailMapper, creatorDetailMapper, apiMediaTypes } from '../index.js';

export const getDetailSerie = (id) => {
  const params = {
    api_key: apiKey,
    language: 'es-ES'
  };

  return axios.get(`${apiUrl}/${apiMediaTypes.TV}/${id}`, { params }).then((response) => {
    const data = response.data || {};
    const { creators, ...detail } = mediaDetailMapper(data);

    return {
      ...detail,
      creators: (creators || []).map(creatorDetailMapper)
    };
  });
};
