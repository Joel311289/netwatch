import Grid from '../../components/UI/Grid/Grid';
import MediaItem from '../../components/Media/MediaItem/MediaItem';
import MediaHeading from '../../components/Media/MediaHeading/MediaHeading';
import Button from '../../components/UI/Button/Button';
import { useDetailModal } from '../../hooks/useDetailModal';
import { getDiscoverSeries } from '../../services/get-discover-series';
import { useLoadMore } from '../../hooks/useLoadMore';
import { isEmptyArray } from '../../utils/helpers';
import { routeMediaDetail } from '../../services';

const SeriesPage = () => {
  const { onModalOpen, ModalDetail } = useDetailModal();
  const [series, loading, onLoadMore] = useLoadMore(getDiscoverSeries, 20);

  return (
    <div className="container">
      <h2 className="heading">Series de televisión</h2>

      <div className="sub-heading">
        <MediaHeading text="Más populares"></MediaHeading>
      </div>

      <Grid>
        {series.map((item, index) => (
          <MediaItem
            key={index}
            ratio={1.5}
            skeleton={!item}
            to={routeMediaDetail(item)}
            onDetail={() => onModalOpen(item)}
            {...(item || {})}
          />
        ))}
      </Grid>

      {!loading && !isEmptyArray(series) && (
        <div className="block">
          <Button size="large" onClick={onLoadMore}>
            Mostrar más
          </Button>
        </div>
      )}

      {ModalDetail}
    </div>
  );
};

export default SeriesPage;
