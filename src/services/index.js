import objectPath from 'object-path';
import { formattedDate, formattedTime } from '../utils/helpers';

const get = objectPath.get;
export const apiKey = import.meta.env.VITE_API_KEY;
export const apiUrl = import.meta.env.VITE_API_URL;
export const apiImagesUrl = import.meta.env.VITE_API_IMAGES_URL;
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
  directing: 'directing',
  writing: 'writing',
  acting: 'acting'
};
export const tvNetworksSupported = {
  213: 'Netflix',
  3186: 'HBO Max',
  1024: 'Amazon Prime Video',
  2552: 'Apple TV+',
  2739: 'Disney +',
  3744: 'Atresplayer Premium',
  5081: 'Movistar Play',
  3980: 'Mitele'
};

export const isMediaMovie = (media) => Object.prototype.hasOwnProperty.call(media, 'release_date');
export const isMediaSerie = (media) =>
  Object.prototype.hasOwnProperty.call(media, 'first_air_date');

export const getMediaType = ({ type }) => (type ? mediaTypes[type] : '');

export const getImageMediaUrl = (path) => (path ? `${apiImagesUrl}${path}` : '');

export const getPersonRoleType = ({ cast_id, department, job }) => {
  if (cast_id) {
    return personRoleTypes.acting;
  } else if (department === 'Directing' && job === 'Director') {
    return personRoleTypes.directing;
  } else if (department === 'Writing' && job === 'Writer') {
    return personRoleTypes.writing;
  } else {
    return '';
  }
};

export const getNetworksSupported = () => Object.keys(tvNetworksSupported).join('|');

export const routeMediaDetail = (media) => (media ? `/${media.type}/${media.id}` : '');

export const mediaDetailMapper = (media) => {
  if (!media) {
    return {};
  }

  const commonData = {
    id: get(media, 'id'),
    type: getMediaType({ type: get(media, 'media_type') }),
    description: get(media, 'overview'),
    image: getImageMediaUrl(get(media, 'poster_path')),
    backdrop: getImageMediaUrl(get(media, 'backdrop_path')),
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
      origin_country: get(media, 'origin_country')
    };
  }

  return commonData;
};

export const videoDetailMapper = (video) => {
  if (!video) {
    return {};
  }

  return {
    name: get(video, 'name'),
    key: get(video, 'key'),
    type: get(video, 'type'),
    youtube: get(video, 'site') === 'Youtube'
  };
};

export const creditDetailMapper = (credit) => {
  if (!credit) {
    return {};
  }

  return {
    id: get(credit, 'id'),
    role: getPersonRoleType(credit),
    name: get(credit, 'name'),
    character: get(credit, 'character'),
    image: getImageMediaUrl(get(credit, 'profile_path'))
  };
};
