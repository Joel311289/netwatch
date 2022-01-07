import { useState } from 'react';

import { useFetch } from '@hooks/useFetch';
import { useFetchPagination } from '@hooks/useLoadMore';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Slider from '@components/Layout/Slider/Slider';
import MediaHeading from '@components/Media/MediaHeading/MediaHeading';
import MediaItem from '@components/Media/MediaItem/MediaItem';
import MediaModal from '@components/Media/MediaModal/MediaModal';

import { routeMediaTypes } from '@services/constants';
import { routeMediaDetail } from '@services/helpers';
import { pathTrending, getTrending } from '@services/global/get-trending';
import { pathDiscoverMovies, getDiscoverMovies } from '@services/movies/get-discover-movies';
import { pathDiscoverSeries, getDiscoverSeries } from '@services/series/get-discover-series';

const HomePage = () => {
  const { itemsPerRow } = useBreakpointViewport();
  const { data: trendings, loading: loadingTrendings } = useFetch(
    pathTrending(),
    getTrending,
    itemsPerRow
  );
  const { data: movies, loading: loadingMovies } = useFetchPagination(
    pathDiscoverMovies,
    getDiscoverMovies,
    itemsPerRow
  );
  const { data: series, loading: loadingSeries } = useFetchPagination(
    pathDiscoverSeries,
    getDiscoverSeries,
    itemsPerRow
  );
  const [fetchModalData, setFetchModalData] = useState({});

  const categories = [
    { heading: 'Tendencias hoy', items: trendings, loading: loadingTrendings },
    {
      route: routeMediaTypes.movie,
      heading: 'Películas populares',
      items: movies,
      loading: loadingMovies
    },
    {
      route: routeMediaTypes.tv,
      heading: 'Series populares',
      items: series,
      loading: loadingSeries
    }
  ];

  const onDetail = (item) => setFetchModalData({ ...item, mode: 'detail' });
  const onTrailer = (item) => setFetchModalData({ ...item, mode: 'trailer' });

  return (
    <div className="App-container App-content">
      <h2 className="heading">Bienvenido, películas y series para ti</h2>

      {categories.map(({ loading, route, heading, items }) => (
        <div key={heading} style={{ marginBottom: 40 }}>
          <div className="sub-heading">
            {!loading && <MediaHeading text={heading} to={route ? `/${route}` : ''} />}
          </div>

          <Slider navigation={!loading}>
            {items.map((item, index) => (
              <MediaItem
                key={index}
                skeleton={loading}
                to={routeMediaDetail(item)}
                ratio={1.5}
                onDetail={() => onDetail(item)}
                onTrailer={() => onTrailer(item)}
                {...item}
              />
            ))}
          </Slider>
        </div>
      ))}

      {fetchModalData.id && (
        <MediaModal {...fetchModalData} onClose={() => setFetchModalData({})} />
      )}
    </div>
  );
};

export default HomePage;
