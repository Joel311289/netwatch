import axios from 'axios';

import { apiUrl, mediaTypes } from '@services/constants';
import { watchProvidersDetailMapper, watchProviderDetailMapper } from '@services/mappers';

export const getWatchProvidersMovie = (id) => {
  return axios.get(`${apiUrl}/${mediaTypes.MOVIE}/${id}/watch/providers`).then(({ results }) => {
    const { watch_link, providers } = watchProvidersDetailMapper(results['ES']);

    return {
      watch_link,
      providers: providers.map(watchProviderDetailMapper)
    };
  });
};
