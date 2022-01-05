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
export const videoSites = {
  youtube: 'YouTube'
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