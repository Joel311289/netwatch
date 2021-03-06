import axios from 'axios';

import { apiUrl, mediaTypes, personRoleTypes } from '@services/constants';
import { creditDetailMapper } from '@services/mappers';

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

export const getCreditsMovie = (id) => {
  return axios
    .get(`${apiUrl}/${mediaTypes.MOVIE}/${id}/credits`)
    .then(({ cast, crew }) => {
      return {
        cast: filterCredits(cast, personRoleTypes.Acting),
        directors: filterCredits(crew, personRoleTypes.Directing),
        writers: filterCredits(crew, personRoleTypes.Writing)
      };
    })
    .catch(console.error);
};
