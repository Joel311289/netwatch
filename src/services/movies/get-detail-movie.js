import axios from 'axios';

import { personRoleTypes } from '@services/constants';
import {
  creditDetailMapper,
  externalsIdsDetailMapper,
  imageDetailMapper,
  mediaDetailMapper,
  videoDetailMapper,
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
  if (!results['ES']) {
    return null;
  }
  const { watch_link, providers } = watchProvidersDetailMapper(results['ES']);

  return {
    watch_link,
    providers: providers.map(watchProviderDetailMapper)
  };
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

export const getDetailMovie = (url, { append_to_response } = {}) => {
  try {
    const params = {
      ...(append_to_response && { append_to_response: append_to_response.join(',') }),
      include_image_language: 'es,null',
      include_video_language: 'es,null'
    };

    return axios.get(`${url}`, { params }).then((response) => {
      const {
        credits,
        ['watch/providers']: watch_providers,
        external_ids,
        images,
        videos,
        ...detail
      } = response;

      return {
        ...mediaDetailMapper(detail),
        ...(credits && { credits: detailCredits(credits) }),
        ...(watch_providers && { watch_providers: detailWatchProviders(watch_providers) }),
        ...(external_ids && { external_ids: externalsIdsDetailMapper(external_ids) }),
        ...(images && { ...detailImages(images, mediaDetailMapper(detail)) }),
        ...(videos && { videos: detailVideos(videos) })
      };
    });
  } catch (error) {
    console.error(error);
  }
};
