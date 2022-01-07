import axios from 'axios';

import {
  mediaDetailMapper,
  creatorDetailMapper,
  watchProvidersDetailMapper,
  externalsIdsDetailMapper,
  creditDetailMapper,
  watchProviderDetailMapper
} from '@services/mappers';
import { personRoleTypes } from '@services/constants';

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

const detailCredits = ({ cast }) => {
  return {
    cast: filterCredits(cast, personRoleTypes.Acting)
  };
};

const detailWatchProviders = ({ results }) => {
  const { watch_link, providers } = watchProvidersDetailMapper(results['ES']);

  return {
    watch_link,
    providers: providers.map(watchProviderDetailMapper)
  };
};

export const getDetailSerie = (url, { append_to_response } = {}) => {
  const params = {
    ...(append_to_response && { append_to_response: append_to_response.join(',') })
  };

  return axios.get(`${url}`, { params }).then((response) => {
    const {
      credits,
      ['watch/providers']: watch_providers,
      external_ids,
      created_by: creators,
      ...detail
    } = response;

    try {
      return {
        ...mediaDetailMapper(detail),
        creators: (creators || []).map(creatorDetailMapper),
        ...(credits && { credits: detailCredits(credits) }),
        ...(watch_providers && { watch_providers: detailWatchProviders(watch_providers) }),
        ...(external_ids && { external_ids: externalsIdsDetailMapper(external_ids) })
      };
    } catch (error) {
      console.error(error);
    }
  });
};
