import MediaCategorySlider from '../../components/Media/MediaCategorySlider/MediaCategorySlider';
import { useLoadDataPage } from '../../hooks/useLoadDataPage';
import { getTrending } from '../../services/get-trending';
import { getDiscoverMovies } from '../../services/get-discover-movies';
import { getDiscoverSeries } from '../../services/get-discover-series';
import './HomePage.css';

const HomePage = () => {
  const { data: trendings, loading: loadingTrendings } = useLoadDataPage(() => getTrending(), 8);
  const { data: movies, loading: loadingMovies } = useLoadDataPage(() => getDiscoverMovies(), 8);
  const { data: series, loading: loadingSeries } = useLoadDataPage(() => getDiscoverSeries(), 8);

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
