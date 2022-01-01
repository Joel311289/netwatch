import MediaCategorySlider from '../../components/Media/MediaCategorySlider/MediaCategorySlider';
import { useLoadDataPage } from '../../hooks/useLoadDataPage';
import { useBreakpointViewport } from '../../hooks/useBreakpointViewport';
import { getTrending } from '../../services/get-trending';
import { getDiscoverMovies } from '../../services/movies/get-discover-movies';
import { getDiscoverSeries } from '../../services/series/get-discover-series';
import { getBreakpointConfigPlaceholders } from '../../utils/helpers';
import { mediaTypes } from '../../services/index';

const HomePage = () => {
  const breakpoint = useBreakpointViewport();
  const itemsPlaceholder = getBreakpointConfigPlaceholders(breakpoint);
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
    { heading: 'Tendencias hoy', items: trendings, skeleton: loadingTrendings },
    {
      type: mediaTypes.movie,
      heading: 'Películas populares',
      items: movies,
      skeleton: loadingMovies
    },
    { type: mediaTypes.tv, heading: 'Series populares', items: series, skeleton: loadingSeries }
  ];

  return (
    <div className="App-container App-content">
      <h2 className="heading">Bienvenido, películas y series para ti</h2>

      {categories.map((category) => (
        <div key={category.heading}>
          <MediaCategorySlider {...category} />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
