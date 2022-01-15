import axios from 'axios';

import {
  mediaDetailMapper,
  creatorDetailMapper,
  watchProvidersDetailMapper,
  externalsIdsDetailMapper,
  aggregateCreditDetailMapper,
  watchProviderDetailMapper,
  seasonDetailMapper,
  imageDetailMapper,
  videoDetailMapper
} from '@services/mappers';
import { sortCollectionBy } from '@utils/helpers/collections';

const detailCredits = ({ cast }) => {
  return {
    cast: cast.map(aggregateCreditDetailMapper)
  };
};

const detailWatchProviders = ({ results }) => {
  if (!results['ES']) {
    return null;
  }
  const { watch_link, providers } = watchProvidersDetailMapper(results['ES']);

  return {
    watch_link,
    providers: providers.map(watchProviderDetailMapper)
  };
};

const detailSeasons = (seasons = []) => {
  const sortedSeasons = sortCollectionBy(seasons, 'season_number', true);

  return sortedSeasons.map(seasonDetailMapper);
};

const detailImages = ({ backdrops, posters }, { image, backdrop }) => {
  const existBackdrop = (backdrops || []).find(({ file_path }) => backdrop.includes(file_path));
  const existPoster = (posters || []).find(({ file_path }) => image.includes(file_path));

  return {
    backdrops: [
      ...(existBackdrop ? [] : [{ image: backdrop }]),
      ...backdrops.map((image) => imageDetailMapper(image, true))
    ],
    posters: [...(existPoster ? [] : [{ image }]), ...posters.map(imageDetailMapper)]
  };
};

const detailVideos = ({ results }) => {
  return results.map(videoDetailMapper);
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
      videos,
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
        ...(images && { ...detailImages(images, mediaDetailMapper(detail)) }),
        ...(videos && { videos: detailVideos(videos) })
      };
    } catch (error) {
      console.error(error);
    }
  });
};
