import objectPath from 'object-path';

import {
  apiBackdropUrl,
  apiImageUrl,
  apiLogoUrl,
  mediaTypes,
  personRoleTypes
} from '@services/constants';
import {
  getImageMediaUrl,
  getMediaType,
  isMediaMovie,
  isMediaSerie,
  getPersonRoleType
} from '@services/helpers';

import { formattedDate, formattedTime } from '@utils/helpers/strings';

const get = objectPath.get;

export const mediaDetailMapper = (media) => {
  const commonData = {
    id: get(media, 'id'),
    type: getMediaType({ type: get(media, 'media_type') }),
    description: get(media, 'overview'),
    image: getImageMediaUrl(apiImageUrl, get(media, 'poster_path')),
    backdrop: getImageMediaUrl(apiBackdropUrl, get(media, 'backdrop_path')),
    genres: (get(media, 'genres') || []).map((g) => g.name),
    original_language: get(media, 'original_language'),
    popularity: get(media, 'popularity'),
    vote_count: get(media, 'vote_count'),
    vote_average: get(media, 'vote_average'),
    homepage: get(media, 'homepage')
  };

  if (isMediaMovie(media)) {
    return {
      ...commonData,
      type: commonData.type || mediaTypes.movie,
      title: get(media, 'title'),
      original_title: get(media, 'original_title'),
      date: formattedDate(get(media, 'release_date')),
      duration: formattedTime(get(media, 'runtime')),
      adult: get(media, 'adult'),
      video: get(media, 'video')
    };
  }

  if (isMediaSerie(media)) {
    return {
      ...commonData,
      type: commonData.type || mediaTypes.tv,
      title: get(media, 'name'),
      original_title: get(media, 'original_name'),
      date: formattedDate(get(media, 'first_air_date')),
      duration: formattedTime(get(media, 'episode_run_time.0')),
      origin_country: get(media, 'origin_country'),
      number_seasons: get(media, 'number_of_seasons'),
      number_episodes: get(media, 'number_of_episodes'),
      creators: get(media, 'created_by')
    };
  }

  return commonData;
};

export const videoDetailMapper = (video) => {
  return {
    name: get(video, 'name'),
    key: get(video, 'key'),
    type: get(video, 'type'),
    site: get(video, 'site')
  };
};

export const creditDetailMapper = (credit) => {
  return {
    id: get(credit, 'id'),
    role: getPersonRoleType(credit),
    job: [get(credit, 'job')],
    name: get(credit, 'name'),
    character: get(credit, 'character'),
    image: getImageMediaUrl(apiImageUrl, get(credit, 'profile_path'))
  };
};

export const creatorDetailMapper = (creator) => {
  return {
    id: get(creator, 'id'),
    role: personRoleTypes.Creator,
    job: 'Creator',
    name: get(creator, 'name'),
    image: getImageMediaUrl(apiImageUrl, get(creator, 'profile_path'))
  };
};

export const watchProvidersDetailMapper = (providers) => {
  return {
    watch_link: get(providers, 'link'),
    providers: get(providers, 'flatrate')
  };
};

export const watchProviderDetailMapper = (provider) => {
  return {
    id: get(provider, 'provider_id'),
    name: get(provider, 'provider_name'),
    image: getImageMediaUrl(apiLogoUrl, get(provider, 'logo_path'))
  };
};

export const externalsIdsDetailMapper = (externals) => {
  const url = (path, key) => {
    const id = get(externals, key);
    return id ? `${path}${id}` : '';
  };

  return [
    { id: 'imdb', name: 'IMDb', url: url('https://www.imdb.com/title/', 'imdb_id') },
    { id: 'facebook', name: 'Facebook', url: url('https://www.facebook.com/', 'facebook_id') },
    { id: 'instagram', name: 'Instagram', url: url('https://www.instagram.com/', 'instagram_id') },
    { id: 'twitter', name: 'Twitter', url: url('https://twitter.com/', 'twitter_id') }
  ];
};
