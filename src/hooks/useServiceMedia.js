import { useFetchPagination } from '@hooks/useFetchPagination';

import { mediaTypes } from '@services/constants';
import { getDiscoverMovies } from '@services/movies/get-discover-movies';
import { getDiscoverSeries } from '@services/series/get-discover-series';

const getDiscover = {
  [mediaTypes.MOVIE]: getDiscoverMovies,
  [mediaTypes.TV]: getDiscoverSeries
};

export const useServiceMedia = (mediaType) => {
  const response = useFetchPagination(`/api/discover/${mediaType}`, getDiscover[mediaType], 20);

  return { ...response, data: response.data || {} };
};
