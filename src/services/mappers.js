import { get } from 'lodash';

import {
  apiBackdropUrl,
  apiImageUrl,
  apiLogoUrl,
  languages,
  mediaTypes,
  personGenders,
  personRoleTypes
} from '@services/constants';
import {
  getImageMediaUrl,
  isMediaMovie,
  isMediaSerie,
  getPersonRoleType,
  isMediaPerson
} from '@services/helpers';

import { diffYearsDate, formattedDate, formattedTime } from '@utils/helpers/strings';

export const mediaDetailMapper = (media) => {
  const commonData = {
    id: get(media, 'id'),
    type: get(media, 'media_type'),
    description: get(media, 'overview'),
    image: getImageMediaUrl(apiImageUrl, get(media, 'poster_path')),
    backdrop: getImageMediaUrl(apiBackdropUrl, get(media, 'backdrop_path')),
    genres: (get(media, 'genres') || []).map((g) => g.name),
    original_language: languages[get(media, 'original_language')] || languages.en,
    popularity: get(media, 'popularity'),
    vote_count: get(media, 'vote_count', 0).toFixed(1),
    vote_average: get(media, 'vote_average', 0).toFixed(1),
    homepage: get(media, 'homepage')
  };

  if (isMediaMovie(media)) {
    return {
      ...commonData,
      type: commonData.type || mediaTypes.MOVIE,
      title: get(media, 'title'),
      original_title: get(media, 'original_title') || get(media, 'title'),
      date: formattedDate(get(media, 'release_date')),
      duration: formattedTime(get(media, 'runtime')),
      adult: get(media, 'adult')
    };
  }

  if (isMediaSerie(media)) {
    const next_date = formattedDate(get(media, 'next_episode_to_air.air_date'));

    return {
      ...commonData,
      type: commonData.type || mediaTypes.TV,
      title: get(media, 'name'),
      original_title: get(media, 'original_name') || get(media, 'name'),
      date: formattedDate(get(media, 'first_air_date')),
      next_episode_to_air: next_date && {
        next_episode_date: next_date,
        next_episode_season_number: get(media, 'next_episode_to_air.season_number'),
        next_episode_name: get(media, 'next_episode_to_air.name'),
        next_episode_description: get(media, 'next_episode_to_air.description')
      },
      duration: formattedTime(get(media, 'episode_run_time[0]')),
      origin_country: get(media, 'origin_country[0]'),
      number_seasons: get(media, 'number_of_seasons'),
      number_episodes: get(media, 'number_of_episodes'),
      creators: get(media, 'created_by')
    };
  }

  if (isMediaPerson(media)) {
    return {
      ...commonData,
      image: getImageMediaUrl(apiImageUrl, get(media, 'profile_path')),
      type: commonData.type || mediaTypes.PERSON,
      title: get(media, 'name'),
      biography: get(media, 'biography'),
      original_title: get(media, 'original_name') || get(media, 'name'),
      date: formattedDate(get(media, 'birthday')),
      date_death: formattedDate(get(media, 'deathday')),
      age: diffYearsDate(get(media, 'birthday'), get(media, 'deathday')),
      gender: personGenders[get(media, 'gender', 0)],
      place_of_birth: get(media, 'place_of_birth'),
      also_known_as: get(media, 'also_known_as', []),
      original_language: ''
    };
  }

  return commonData;
};

export const episodeDetailMapper = (episode) => {
  return {
    id: get(episode, 'id'),
    key: `T${get(episode, 'season_number')}x${get(episode, 'episode_number')} - ${get(
      episode,
      'name'
    )}`,
    season_number: get(episode, 'season_number'),
    episode_number: get(episode, 'episode_number'),
    title: get(episode, 'name'),
    date: formattedDate(get(episode, 'air_date')),
    description: get(episode, 'overview'),
    image: getImageMediaUrl(apiBackdropUrl, get(episode, 'still_path'))
  };
};

export const seasonDetailMapper = (season) => {
  return {
    id: get(season, 'id'),
    key: `T${get(season, 'season_number')} - ${get(season, 'name')}`,
    season_number: get(season, 'season_number'),
    title: get(season, 'name'),
    date: formattedDate(get(season, 'air_date')),
    episodes: get(season, 'episode_count'),
    description: get(season, 'overview'),
    image: getImageMediaUrl(apiImageUrl, get(season, 'poster_path'))
  };
};

export const videoDetailMapper = (video) => {
  return {
    name: get(video, 'name'),
    key: get(video, 'key'),
    type: get(video, 'type'),
    site: get(video, 'site'),
    language: get(video, 'iso_639_1'),
    region: get(video, 'iso_3166_1')
  };
};

export const imageDetailMapper = (image, isBackdrop) => {
  return {
    image: getImageMediaUrl(!isBackdrop ? apiImageUrl : apiBackdropUrl, get(image, 'file_path')),
    // width: get(image, 'width'),
    // height: get(image, 'height'),
    vote_average: get(image, 'vote_average'),
    ratio: 1 / get(image, 'aspect_ratio'),
    language: get(image, 'iso_639_1')
  };
};

export const creditDetailMapper = (credit) => {
  const character = get(credit, 'character');
  return {
    id: get(credit, 'id'),
    role: getPersonRoleType(credit),
    job: [character ? 'cast' : get(credit, 'job', '')],
    name: get(credit, 'name'),
    original_name: get(credit, 'original_name'),
    characters: character ? character.split(' / ') : [],
    image: getImageMediaUrl(apiImageUrl, get(credit, 'profile_path'))
  };
};

export const aggregateCreditDetailMapper = (credit) => {
  return {
    id: get(credit, 'id'),
    role: personRoleTypes.Acting,
    name: get(credit, 'name'),
    original_name: get(credit, 'original_name') || get(credit, 'name'),
    characters: (get(credit, 'roles') || []).map((character) => get(character, 'character')),
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
    providers: get(providers, 'flatrate') || []
  };
};

export const watchProviderDetailMapper = (provider) => {
  return {
    id: get(provider, 'provider_id'),
    name: get(provider, 'provider_name'),
    image: getImageMediaUrl(apiLogoUrl, get(provider, 'logo_path'))
  };
};

export const externalsIdsDetailMapper = (externals, isPerson) => {
  const url = (path, key) => {
    const id = get(externals, key);
    return id ? `${path}${id}` : '';
  };
  const imdbKey = isPerson ? 'name' : 'title';

  return [
    { id: 'imdb', name: 'IMDb', url: url(`https://www.imdb.com/${imdbKey}/`, 'imdb_id') },
    { id: 'facebook', name: 'Facebook', url: url('https://www.facebook.com/', 'facebook_id') },
    { id: 'instagram', name: 'Instagram', url: url('https://www.instagram.com/', 'instagram_id') },
    { id: 'twitter', name: 'Twitter', url: url('https://twitter.com/', 'twitter_id') }
  ];
};
