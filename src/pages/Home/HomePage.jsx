import classNames from 'classnames/bind';
import MediaSlider from '../../components/Media/MediaSlider/MediaSlider';
import MediaHeading from '../../components/Media/MediaHeading/MediaHeading';
import { useLoadDataPage } from '../../hooks/useLoadDataPage';
import { useBreakpointViewport } from '../../hooks/useBreakpointViewport';
import { getTrending } from '../../services/get-trending';
import { getDiscoverMovies } from '../../services/get-discover-movies';
import { getDiscoverSeries } from '../../services/get-discover-series';
import { getBreakpointConfigPlaceholders } from '../../utils/helpers';
import styles from './HomePage.module.css';

const HomePage = () => {
  const breakpoint = useBreakpointViewport();
  const itemsPlaceholder = getBreakpointConfigPlaceholders(breakpoint);
  const { data: trendings, loading: loadingTrendings } = useLoadDataPage(() => getTrending(), itemsPlaceholder);
  const { data: movies, loading: loadingMovies } = useLoadDataPage(() => getDiscoverMovies(), itemsPlaceholder);
  const { data: series, loading: loadingSeries } = useLoadDataPage(() => getDiscoverSeries(), itemsPlaceholder);

  const categories = [
    { heading: 'Tendencias hoy', items: trendings, loading: loadingTrendings },
    { type: 'movies', heading: 'Películas populares', items: movies, loading: loadingMovies },
    { type: 'series', heading: 'Series populares', items: series, loading: loadingSeries },
  ];

  const classes = (loading) => classNames.bind(styles)({ skeleton: Boolean(loading) });

  return (
    <div className="container">
      <h2 className="heading">Bienvenido, películas y series para ti</h2>

      {categories.map(({ type, heading, items, loading }) => (
        <div key={heading}>
          <div className={`heading ${classes(loading)}`}>
            <MediaHeading text={heading} to={type ? `/${type}` : ''}></MediaHeading>
          </div>
          <MediaSlider items={items} loading={loading}></MediaSlider>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
