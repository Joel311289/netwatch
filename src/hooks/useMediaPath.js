import { useLocation, useParams } from 'react-router-dom';

import { mediaTypeByRoute } from '@services/helpers';

import { getSectionPath, getIdFromParams } from '@utils/helpers/strings';

export const useMediaPath = () => {
  const id = getIdFromParams(useParams(), 'key');
  const { pathname } = useLocation();

  const mediaType = mediaTypeByRoute(getSectionPath(pathname));
  const section = getSectionPath(pathname, 3);

  return { mediaType, id, section };
};
