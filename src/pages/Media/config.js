import { mediaTypes } from '@services/constants';

const headingsMedia = {
  [mediaTypes.MOVIE]: 'Películas',
  [mediaTypes.TV]: 'Series de televisión'
};

export const discoverProps = (mediaType) => ({
  heading: headingsMedia[mediaType]
});
