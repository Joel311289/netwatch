import MediaCategorySlider from '../../components/Media/MediaCategorySlider/MediaCategorySlider';
import { useLoadDataPage } from '../../hooks/useLoadDataPage';
import { useBreakpointViewport } from '../../hooks/useBreakpointViewport';
import { getTrending } from '../../services/get-trending';
import { getDiscoverMovies } from '../../services/get-discover-movies';
import { getDiscoverSeries } from '../../services/get-discover-series';
import { getBreakpointConfigPlaceholders } from '../../utils/helpers';
import './HomePage.css';

const HomePage = () => {
  const breakpoint = useBreakpointViewport();
  const itemsPlaceholder = getBreakpointConfigPlaceholders(breakpoint);
  const { data: trendings, loading: loadingTrendings } = useLoadDataPage(() => getTrending(), itemsPlaceholder);
  const { data: movies, loading: loadingMovies } = useLoadDataPage(() => getDiscoverMovies(), itemsPlaceholder);
  const { data: series, loading: loadingSeries } = useLoadDataPage(() => getDiscoverSeries(), itemsPlaceholder);

  return (
    <div className="container">
      <h2 className="heading">Bienvenido, películas y series para ti</h2>

      <MediaCategorySlider heading="Tendencias hoy" items={trendings} loading={loadingTrendings}></MediaCategorySlider>

      <MediaCategorySlider heading="Películas populares" type="movies" items={movies} loading={loadingMovies}></MediaCategorySlider>

      <MediaCategorySlider heading="Series populares" type="series" items={series} loading={loadingSeries}></MediaCategorySlider>
    </div>
  );
};

export default HomePage;
