import axios from 'axios';
import { apiKey, apiUrl, apiMediaTypes, creditDetailMapper, personRoleTypes } from '../index.js';

// Filter by role type and merge jobs
const filterCredits = (credits, role) => {
  const creditsFiltered = [];
  const creditsMapped = credits.map(creditDetailMapper).filter((credit) => credit.role === role);

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

export const getCreditsSerie = (id) => {
  const params = {
    api_key: apiKey,
    language: 'es-ES'
  };

  return axios
    .get(`${apiUrl}/${apiMediaTypes.TV}/${id}/credits`, { params })
    .then((response) => {
      const { cast } = response.data || {};

      return {
        cast: filterCredits(cast, personRoleTypes.Acting)
      };
    })
    .catch(console.error);
};
