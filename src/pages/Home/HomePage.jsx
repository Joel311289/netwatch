import { useState } from 'react';

import { useFetch } from '@hooks/useFetch';
import { useFetchPagination } from '@hooks/useFetchPagination';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import ToggleButton from '@components/UI/ToggleButton/ToggleButton';
import Slider from '@components/Layout/Slider/Slider';
import MediaHeading from '@components/Media/MediaHeading/MediaHeading';
import MediaItem from '@components/Media/MediaItem/MediaItem';
import MediaModal from '@components/Media/MediaModal/MediaModal';

import { routeMediaTypes, mediaTypes, timesWindow } from '@services/constants';
import { routeMediaDetail } from '@services/helpers';
import { getTrending } from '@services/global/get-trending';
import { getDiscoverMovies } from '@services/movies/get-discover-movies';
import { getDiscoverSeries } from '@services/series/get-discover-series';

const HomePage = () => {
  const [timeWindow, setTimeWindow] = useState(timesWindow.DAY);
  const { itemsPerRow } = useBreakpointViewport();
  const { data: trendings, loading: loadingTrendings } = useFetch(
    `/api/trending/${mediaTypes.ALL}/${timeWindow}`,
    getTrending,
    itemsPerRow
  );
  const { data: movies, loading: loadingMovies } = useFetchPagination(
    `/api/discover/${mediaTypes.MOVIE}`,
    getDiscoverMovies,
    itemsPerRow
  );
  const { data: series, loading: loadingSeries } = useFetchPagination(
    `/api/discover/${mediaTypes.TV}`,
    getDiscoverSeries,
    itemsPerRow
  );
  const [fetchModalData, setFetchModalData] = useState({});

  const onChangeTimeWindow = (index) => setTimeWindow(index ? timesWindow.WEEK : timesWindow.DAY);
  const onDetail = (item) => setFetchModalData({ ...item, mode: 'detail' });
  const onTrailer = (item) => setFetchModalData({ ...item, mode: 'trailer' });

  const categories = [
    {
      heading: 'Tendencias',
      items: trendings,
      loading: loadingTrendings,
      content: (
        <div style={{ marginTop: 4 }}>
          <ToggleButton activeIndex={0} onChange={onChangeTimeWindow}>
            <span>hoy</span>
            <span>semana</span>
          </ToggleButton>
        </div>
      )
    },
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

  return (
    <div className="App-container App-content">
      <h2 className="heading">Bienvenido, películas y series para ti</h2>

      {categories.map(({ loading, route, heading, items, content }) => (
        <div key={heading} style={{ marginBottom: 40 }}>
          <div className="sub-heading">
            {!loading && (
              <MediaHeading text={heading} to={route ? `/${route}` : ''} content={content} />
            )}
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
