import { get } from 'lodash';

import {
  routeMediaTypes,
  personRoleTypes,
  tvWatchProvidersSupported,
  videoSites,
  videoTypes,
  mediaTypes
} from '@services/constants';

import { removeSpecialCharactersText } from '@utils/helpers/strings';
import { compactArray, isEmptyArray } from '@utils/helpers/arrays';

export const isMediaPerson = (media) =>
  (Object.prototype.hasOwnProperty.call(media, 'media_type') &&
    media.media_type === mediaTypes.PERSON) ||
  Object.prototype.hasOwnProperty.call(media, 'birthday');
export const isMediaMovie = (media) =>
  media.media_type === mediaTypes.MOVIE ||
  Object.prototype.hasOwnProperty.call(media, 'release_date');
export const isMediaSerie = (media) =>
  media.media_type === mediaTypes.TV ||
  Object.prototype.hasOwnProperty.call(media, 'first_air_date');

export const getImageMediaUrl = (baseUrl, path) => (path ? `${baseUrl}${path}` : '');

export const getPersonRoleType = (credit) =>
  Object.prototype.hasOwnProperty.call(credit, 'character')
    ? personRoleTypes.Acting
    : personRoleTypes[get(credit, 'department', '')];

export const getWatchProvidersSupported = () => Object.keys(tvWatchProvidersSupported).join('|');

export const getVideoUrl = ({ site, key }) =>
  site === videoSites.youtube ? `https://www.youtube.com/watch?v=${key}` : '';
export const getImageVideoUrl = ({ site, key }) =>
  site === videoSites.youtube ? `https://img.youtube.com/vi/${key}/0.jpg` : '';
export const getVideoTrailerYoutubeId = (videos) => {
  if (!videos || isEmptyArray(videos)) {
    return '';
  }
  const trailers = videos.filter(
    (video) => video.type === videoTypes.trailer && video.site === videoSites.youtube
  );
  return get(
    compactArray([
      ...[trailers.find(({ language }) => language === 'es')],
      ...[trailers.find(({ language }) => language === 'en')],
      ...[videos[0]]
    ])[0],
    'key'
  );
};

export const mediaTypeByRoute = (mediaRoute) => {
  const types = ['movie', 'tv', 'person'];
  return types
    .map((type) => ({
      key: mediaTypes[type.toUpperCase()],
      route: routeMediaTypes[type]
    }))
    .find(({ route }) => route === mediaRoute)['key'];
};

export const routeMediaDetail = (media) => {
  if (!media) {
    return '/';
  }
  const { id, type, original_title = '' } = media;
  const removed = removeSpecialCharactersText(original_title.replace(/-/g, ' '));
  const title = removed.trim() ? removed.replace(/ /g, '-') : '';
  const pathType = routeMediaTypes[type];
  return (title ? `/${pathType}/${id}-${title}` : `/${pathType}/${id}`).toLowerCase();
};
export const routePersonDetail = (person) => {
  if (!person) {
    return '/';
  }
  const { id, original_name = '' } = person;
  const removed = removeSpecialCharactersText(original_name.replace(/-/g, ' '));
  const name = removed.trim() ? removed.replace(/ /g, '-') : '';
  return (
    name ? `/${routeMediaTypes.person}/${id}-${name}` : `/${routeMediaTypes.person}/${id}`
  ).toLowerCase();
};
export const routeSeasonDetail = (detail) => {
  const { season_number, episode_number } = detail || {};
  const routeSeason = `seasons/${season_number}`;
  return !episode_number ? routeSeason : `${routeSeason}/episodes/${episode_number}`;
};
