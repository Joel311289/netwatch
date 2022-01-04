import { useLoadDataPage } from '@hooks/useLoadDataPage';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';
import { useDetailModal } from '@hooks/useDetailModal';

import Slider from '@components/Layout/Slider/Slider';
import MediaHeading from '@components/Media/MediaHeading/MediaHeading';
import MediaItem from '@components/Media/MediaItem/MediaItem';

import { mediaTypes } from '@services/constants';
import { routeMediaDetail } from '@services/helpers';
import { getTrending } from '@services/global/get-trending';
import { getDiscoverMovies } from '@services/movies/get-discover-movies';
import { getDiscoverSeries } from '@services/series/get-discover-series';

import { getBreakpointConfigPlaceholders } from '@utils/breakpoints';
import { flattenArray, isEmptyArray } from '@utils/arrays';

const HomePage = () => {
  const breakpoint = useBreakpointViewport();
  const itemsPlaceholder = getBreakpointConfigPlaceholders(breakpoint);
  const { onModalOpen, ModalDetail } = useDetailModal();
  const { data: trendings, loading: loadingTrendings } = useLoadDataPage(
    getTrending,
    itemsPlaceholder
  );
  const { data: movies, loading: loadingMovies } = useLoadDataPage(
    getDiscoverMovies,
    itemsPlaceholder
  );
  const { data: series, loading: loadingSeries } = useLoadDataPage(
    getDiscoverSeries,
    itemsPlaceholder
  );

  const categories = [
    { heading: 'Tendencias hoy', items: trendings, loading: loadingTrendings },
    {
      type: mediaTypes.movie,
      heading: 'Películas populares',
      items: movies,
      loading: loadingMovies
    },
    { type: mediaTypes.tv, heading: 'Series populares', items: series, loading: loadingSeries }
  ];

  return (
    <div className="App-container App-content">
      <h2 className="heading">Bienvenido, películas y series para ti</h2>

      {categories.map(({ loading, type, heading, items }) => (
        <div key={heading} style={{ marginBottom: 40 }}>
          <div className="sub-heading">
            <MediaHeading skeleton={!items} text={heading} to={type ? `/${type}` : ''} />
          </div>

          <Slider navigation={!isEmptyArray(items)}>
            {flattenArray(!items ? loading : items).map((item, index) => (
              <MediaItem
                key={index}
                skeleton={!items}
                to={routeMediaDetail(item)}
                ratio={1.5}
                onDetail={() => onModalOpen(item)}
                {...item}
              />
            ))}
          </Slider>
        </div>
      ))}

      {ModalDetail}
    </div>
  );
};

export default HomePage;
