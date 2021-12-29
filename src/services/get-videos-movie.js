import axios from 'axios';
import { apiKey, apiUrl, apiMediaTypes, videoDetailMapper } from './index.js';

export const getVideosMovie = (id) => {
  const params = {
    api_key: apiKey,
    language: 'es-ES'
  };

  return axios.get(`${apiUrl}/${apiMediaTypes.MOVIE}/${id}/videos`, { params }).then((response) => {
    const { results } = response.data || {};

    return results.map((result) => videoDetailMapper(result));
  });
};
