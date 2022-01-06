import { useFetchData } from '@hooks/useFetchData';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';
import { useDetailModal } from '@hooks/useDetailModal';
import { useTrailerModal } from '@hooks/useTrailerModal';

import Slider from '@components/Layout/Slider/Slider';
import MediaHeading from '@components/Media/MediaHeading/MediaHeading';
import MediaItem from '@components/Media/MediaItem/MediaItem';

import { mediaTypes } from '@services/constants';
import { routeMediaDetail } from '@services/helpers';
import { getTrending } from '@services/global/get-trending';
import { getDiscoverMovies } from '@services/movies/get-discover-movies';
import { getDiscoverSeries } from '@services/series/get-discover-series';

const HomePage = () => {
  const { itemsPerRow } = useBreakpointViewport();
  const { onModalOpen: onModalDetail, ModalDetail } = useDetailModal();
  const { onModalOpen: onModalTrailer, ModalTrailer } = useTrailerModal();
  const { data: trendings, loading: loadingTrendings } = useFetchData(getTrending, itemsPerRow);
  const { data: movies, loading: loadingMovies } = useFetchData(getDiscoverMovies, itemsPerRow);
  const { data: series, loading: loadingSeries } = useFetchData(getDiscoverSeries, itemsPerRow);

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
            {items && (
              <MediaHeading skeleton={loading} text={heading} to={type ? `/${type}` : ''} />
            )}
          </div>

          <Slider navigation={!loading}>
            {items.map((item, index) => (
              <MediaItem
                key={index}
                skeleton={loading}
                to={routeMediaDetail(item)}
                ratio={1.5}
                onDetail={() => onModalDetail(item.type, item.id)}
                onTrailer={() => onModalTrailer(item.type, item.id)}
                {...item}
              />
            ))}
          </Slider>
        </div>
      ))}

      {ModalDetail}
      {ModalTrailer}
    </div>
  );
};

export default HomePage;
