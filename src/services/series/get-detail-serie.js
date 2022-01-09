import axios from 'axios';

import {
  mediaDetailMapper,
  creatorDetailMapper,
  watchProvidersDetailMapper,
  externalsIdsDetailMapper,
  aggregateCreditDetailMapper,
  watchProviderDetailMapper,
  seasonDetailMapper,
  imageDetailMapper
} from '@services/mappers';
import { sortCollectionBy } from '@utils/helpers/collections';

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

const detailSeasons = (seasons = []) => {
  const sortedSeasons = sortCollectionBy(seasons, 'season_number', true);

  return (sortedSeasons.filter(({ air_date }) => air_date) || []).map(seasonDetailMapper);
};

const detailImages = ({ backdrops, posters }) => {
  return {
    backdrops: backdrops.map((image) => imageDetailMapper(image, true)),
    posters: posters.map(imageDetailMapper)
  };
};

export const getDetailSerie = (url, { append_to_response } = {}) => {
  const params = {
    ...(append_to_response && { append_to_response: append_to_response.join(',') }),
    include_image_language: 'es,null',
    include_video_language: 'es,null'
  };

  return axios.get(`${url}`, { params }).then((response) => {
    const {
      aggregate_credits: credits,
      ['watch/providers']: watch_providers,
      external_ids,
      created_by: creators,
      seasons,
      images,
      ...detail
    } = response;

    try {
      return {
        ...mediaDetailMapper(detail),
        creators: (creators || []).map(creatorDetailMapper),
        ...(credits && { credits: detailCredits(credits) }),
        ...(watch_providers && { watch_providers: detailWatchProviders(watch_providers) }),
        ...(external_ids && { external_ids: externalsIdsDetailMapper(external_ids) }),
        ...(seasons && { seasons: detailSeasons(seasons) }),
        ...(images && { ...detailImages(images) })
      };
    } catch (error) {
      console.error(error);
    }
  });
};
