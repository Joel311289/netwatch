import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import MediaDetail from '../../components/Media/MediaDetail/MediaDetail';
import { useLoadDataPage } from '../../hooks/useLoadDataPage';
import { getCreditsMovie } from '../../services/get-credits-movie';
import { getDetailMovie } from '../../services/get-detail-movie';
import { getIdFromParams } from '../../utils/helpers';

const MoviesDetailPage = () => {
  const id = getIdFromParams(useParams(), 'key');

  const { data: movie, loading } = useLoadDataPage(getDetailMovie.bind(this, id));
  const { data: credits, loading: loadingCredits } = useLoadDataPage(
    getCreditsMovie.bind(this, id)
  );
  const isLoading = useMemo(() => loading && loadingCredits, [loading, loadingCredits]);

  return (
    <div className="container">
      <MediaDetail skeleton={isLoading} {...movie} {...credits} />
    </div>
  );
};

export default MoviesDetailPage;
