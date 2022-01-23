import { useFetch } from '@hooks/useFetch';
import { useFetchPagination } from '@hooks/useFetchPagination';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import MediaHeading from '@components/Media/MediaHeading/MediaHeading';
import MediaSliderItem from '@components/Media/MediaSlider/MediaSlider-item';

import { routeMediaTypes, mediaTypes, timesWindow } from '@services/constants';
import { getTrending } from '@services/global/get-trending';
import { getDiscoverMovies } from '@services/movies/get-discover-movies';
import { getDiscoverSeries } from '@services/series/get-discover-series';

import styles from '@pages/Home/HomePage.module.css';

const HomePage = () => {
  const { mobile, smallDesktop, itemsPerRow } = useBreakpointViewport();

  const { data: trendings, loading: loadingTrendings } = useFetch(
    `/api/trending/${mediaTypes.ALL}/${timesWindow.DAY}`,
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

  const categories = [
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

  const trendingsPerView = () => {
    if (mobile) return 1;
    if (smallDesktop) return 2;
    return 3;
  };

  return (
    <div className="App-container App-content">
      <h2 className="heading">Bienvenid@, películas y series para ti</h2>

      <div className={styles.trending}>
        <div className="sub-heading">
          <MediaHeading text="Tendencias" />
        </div>

        <MediaSliderItem
          skeleton={loadingTrendings}
          sliderPerView={trendingsPerView()}
          items={trendings}
          imageKey="backdrop"
          ratio={0.56}
          listable
          watchable
        />
      </div>

      {categories.map(({ loading, route, heading, items, content }) => (
        <div key={heading} className={styles.category}>
          <div className="sub-heading">
            <MediaHeading text={heading} to={route ? `/${route}` : ''} content={content} />
          </div>

          <MediaSliderItem skeleton={loading} items={items} listable />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
