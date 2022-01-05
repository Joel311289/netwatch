import axios from 'axios';

import { apiUrl, apiMediaTypes } from '@services/constants';
import { watchProvidersDetailMapper, watchProviderDetailMapper } from '@services/mappers';

export const getWatchProvidersSerie = (id) => {
  return axios.get(`${apiUrl}/${apiMediaTypes.TV}/${id}/watch/providers`).then(({ results }) => {
    const { watch_link, providers } = watchProvidersDetailMapper(results['ES']);

    return {
      watch_link,
      providers: providers.map(watchProviderDetailMapper)
    };
  });
};
