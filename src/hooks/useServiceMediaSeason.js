import { useFetch } from '@hooks/useFetch';

import { mediaTypes } from '@services/constants';
import { getDetailMovie } from '@services/movies/get-detail-movie';
import { getDetailPerson } from '@services/persons/get-detail-person';
import { getDetailSerie } from '@services/series/get-detail-serie';

const getDetails = {
  [mediaTypes.MOVIE]: getDetailMovie,
  [mediaTypes.TV]: getDetailSerie,
  [mediaTypes.PERSON]: getDetailPerson
};

export const useServiceMediaDetail = (mediaType, mediaId, sections) => {
  const response = useFetch(
    [
      `/api/${mediaTypes.TV}/${mediaId}`,
      {
        append_to_response: sections.map((section) => {
          if (section === 'credits') return getCredits[mediaType];
          if (section === 'images') return getImages[mediaType];
          return section;
        })
      }
    ],
    getDetails[mediaType]
  );

  return { ...response, data: response.data || {} };
};
