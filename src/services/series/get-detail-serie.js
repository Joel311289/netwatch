import axios from 'axios';

import {
  mediaDetailMapper,
  creatorDetailMapper,
  watchProvidersDetailMapper,
  externalsIdsDetailMapper,
  aggregateCreditDetailMapper,
  watchProviderDetailMapper
} from '@services/mappers';

const detailCredits = ({ cast }) => {
  return {
    cast: cast.map(aggregateCreditDetailMapper)
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
      aggregate_credits: credits,
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
