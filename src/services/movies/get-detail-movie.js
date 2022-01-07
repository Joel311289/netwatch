import axios from 'axios';

import { personRoleTypes } from '@services/constants';
import {
  creditDetailMapper,
  externalsIdsDetailMapper,
  mediaDetailMapper,
  watchProviderDetailMapper,
  watchProvidersDetailMapper
} from '@services/mappers';

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

const detailCredits = ({ cast, crew }) => {
  return {
    cast: cast.map(creditDetailMapper),
    directors: filterCredits(crew, personRoleTypes.Directing),
    writers: filterCredits(crew, personRoleTypes.Writing)
  };
};

const detailWatchProviders = ({ results }) => {
  const resp = watchProvidersDetailMapper(results['ES']);
  const { watch_link, providers } = resp;

  return {
    watch_link,
    providers: providers.map(watchProviderDetailMapper)
  };
};

export const getDetailMovie = (url, { append_to_response } = {}) => {
  try {
    const params = {
      ...(append_to_response && { append_to_response: append_to_response.join(',') })
    };

    return axios.get(`${url}`, { params }).then((response) => {
      const { credits, ['watch/providers']: watch_providers, external_ids, ...detail } = response;

      return {
        ...mediaDetailMapper(detail),
        ...(credits && { credits: detailCredits(credits) }),
        ...(watch_providers && { watch_providers: detailWatchProviders(watch_providers) }),
        ...(external_ids && { external_ids: externalsIdsDetailMapper(external_ids) })
      };
    });
  } catch (error) {
    console.error(error);
  }
};
