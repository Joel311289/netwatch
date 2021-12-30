import axios from 'axios';
import { apiKey, apiUrl, apiMediaTypes, creditDetailMapper, personRoleTypes } from './index.js';

// Filter by role type and merge jobs
const filterCredits = (credits, role) => {
  const creditsFiltered = [];
  const creditsMapped = credits
    .map((credit) => creditDetailMapper(credit))
    .filter((credit) => credit.role === role);

  creditsMapped.forEach((credit) => {
    let duplicate = creditsFiltered.findIndex((c) => c.id === credit.id);
    if (duplicate >= 0) {
      creditsFiltered[duplicate] = {
        ...creditsFiltered[duplicate],
        job: [...creditsFiltered[duplicate].job, ...credit.job]
      };
    } else {
      creditsFiltered.push(credit);
    }
  });

  return creditsFiltered;
};

export const getCreditsMovie = (id) => {
  const params = {
    api_key: apiKey,
    language: 'es-ES'
  };

  return axios
    .get(`${apiUrl}/${apiMediaTypes.MOVIE}/${id}/credits`, { params })
    .then((response) => {
      const { cast, crew } = response.data || {};

      return {
        cast: filterCredits(cast, personRoleTypes.Acting),
        directors: filterCredits(crew, personRoleTypes.Directing),
        writers: filterCredits(crew, personRoleTypes.Writing)
      };
    })
    .catch(console.error);
};
