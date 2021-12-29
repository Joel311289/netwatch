import axios from 'axios';
import { apiKey, apiUrl, apiMediaTypes, creditDetailMapper, personRoleTypes } from './index.js';

export const getCreditsMovie = (id) => {
  const params = {
    api_key: apiKey,
    language: 'es-ES'
  };

  return axios
    .get(`${apiUrl}/${apiMediaTypes.MOVIE}/${id}/credits`, { params })
    .then((response) => {
      const { cast, crew } = response.data || {};
      const crewMapped = crew.map((person) => creditDetailMapper(person));

      return {
        cast: cast.map((person) => creditDetailMapper(person)),
        directors: crewMapped.filter((person) => person.role === personRoleTypes.directing),
        writers: crewMapped.filter((person) => person.role === personRoleTypes.writing)
      };
    });
};
