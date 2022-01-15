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
import { removeCollectionBy, sortCollectionBy } from '@utils/helpers/collections';

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

const detailImages = ({ backdrops, posters }, { backdrop_path, poster_path }) => {
  return {
    backdrops: [
      { file_path: backdrop_path },
      ...removeCollectionBy(backdrops, 'file_path', backdrop_path)
    ].map((item) => imageDetailMapper(item, true)),
    posters: [
      { file_path: poster_path },
      ...removeCollectionBy(posters, 'file_path', poster_path)
    ].map((item) => imageDetailMapper(item, true))
  };
};

const detailVideos = ({ results }) => {
  return results.map(videoDetailMapper);
};

const detailRecommendations = ({ results }) => {
  return sortCollectionBy(results.map(mediaDetailMapper), 'popularity', true);
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
      recommendations,
      similar,
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
        ...(images && { ...detailImages(images, detail) }),
        ...(videos && { videos: detailVideos(videos) }),
        ...(recommendations && { recommendations: detailRecommendations(recommendations) }),
        ...(similar && { similar: detailRecommendations(similar) })
      };
    } catch (error) {
      console.error(error);
    }
  });
};
