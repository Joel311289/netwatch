import objectPath from 'object-path';
import { formattedDate, formattedTime, removeSpecialCharactersText } from '../utils/helpers';

const get = objectPath.get;
export const apiKey = import.meta.env.VITE_API_KEY;
export const apiUrl = import.meta.env.VITE_API_URL;
export const apiImageUrl = import.meta.env.VITE_API_IMAGES_URL;
export const apiBackdropUrl = import.meta.env.VITE_API_BACKDROP_URL;
export const apiLogoUrl = import.meta.env.VITE_API_LOGO_URL;
export const apiMediaTypes = {
  ALL: 'all',
  MOVIE: 'movie',
  TV: 'tv',
  PERSON: 'person'
};
export const mediaTypes = {
  movie: 'movies',
  tv: 'series',
  person: 'persons'
};
export const videoTypes = {
  trailer: 'Trailer',
  teaser: 'Teaser'
};
export const personRoleTypes = {
  Directing: 'directing',
  Writing: 'writing',
  Acting: 'acting',
  Creator: 'creator'
};
export const tvWatchProvidersSupported = {
  8: 'Netflix',
  119: 'Amazon Prime Video',
  9: 'Amazon Prime Video',
  337: 'Disney Plus',
  384: 'HBO Max',
  149: 'Movistar Plus',
  350: 'Apple TV Plus',
  62: 'Atres Player',
  456: 'Mitele',
  541: 'rtve',
  118: 'HBO'
};

export const isMediaMovie = (media) => Object.prototype.hasOwnProperty.call(media, 'release_date');
export const isMediaSerie = (media) =>
  Object.prototype.hasOwnProperty.call(media, 'first_air_date');

export const getMediaType = ({ type }) => (type ? mediaTypes[type] : '');

export const getImageMediaUrl = (baseUrl, path) => (path ? `${baseUrl}${path}` : '');

export const getPersonRoleType = ({ character, department }) =>
  character ? personRoleTypes.Acting : personRoleTypes[department];

export const getWatchProvidersSupported = () => Object.keys(tvWatchProvidersSupported).join('|');

export const routeMediaDetail = (media) => {
  if (!media) {
    return '';
  }
  const { id, type, original_title = '' } = media;
  const title = removeSpecialCharactersText(original_title, '-');
  return (title ? `/${type}/${id}-${title}` : `/${type}/${id}`).toLowerCase();
};

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
    vote_average: get(media, 'vote_average')
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
      homepage: get(media, 'homepage'),
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
    youtube: get(video, 'site') === 'Youtube'
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

export const externalsDetailMapper = (externals) => {
  const url = (path, key) => {
    const id = get(externals, key);
    return id ? `${path}${id}` : '';
  };

  return {
    id: get(externals, 'id'),
    imdb: url(`https://www.imdb.com/title/', 'imdb_id'`),
    facebook: url(`https://www.facebook.com/', 'facebook_id'`),
    instagram: url(`https://www.instagram.com/', 'instagram_id'`),
    twitter: url(`https://twitter.com/', 'twitter_id'`)
  };
};
