import { Link as LinkRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useFetch } from '@hooks/useFetch';

import Link from '@components/UI/Link/Link';
import Space from '@components/Layout/Space/Space';
import MediaItem from '@components/Media/MediaItem/MediaItem';
import MediaDetail from '@components/Media/MediaDetail/MediaDetail';
import MediaModalDetailSkeleton from '@components/Media/MediaModal/MediaModal-detail-skeleton';

import { mediaTypes } from '@services/constants';
import { routeMediaDetail } from '@services/helpers';
import { pathDetailMovie, getDetailMovie } from '@services/movies/get-detail-movie';
import { pathDetailSerie, getDetailSerie } from '@services/series/get-detail-serie';

import { truncatedText } from '@utils/helpers/strings';

const fetcherDetail = (type) => (type === mediaTypes.MOVIE ? getDetailMovie : getDetailSerie);
const pathService = (type, id) =>
  type === mediaTypes.MOVIE ? pathDetailMovie(id) : pathDetailSerie(id);

const MediaModalDetail = ({ styles, type, id }) => {
  const { data, loading } = useFetch(pathService(type, id), fetcherDetail(type));
  const { image, title, description, backdrop } = data || {};

  if (loading) {
    return <MediaModalDetailSkeleton styles={styles} />;
  }

  return (
    <Space gap={25} className={`media-modal-detail ${styles.detail}`}>
      <div className={styles.image}>
        <MediaItem image={image} width={200} ratio={1.5} />
      </div>
      <div className={styles.background} style={{ backgroundImage: `url(${backdrop})` }}></div>

      <div className={styles.data}>
        <MediaDetail.Header styles={styles} {...data}>
          <LinkRouter to={routeMediaDetail(data)}>
            <span className={styles.title}>{title}</span>
          </LinkRouter>
        </MediaDetail.Header>

        <div className={styles.description}>{truncatedText(description, 400)}</div>

        <div className={styles.more}>
          <Link to={data ? routeMediaDetail(data) : '/'}>Ver más</Link>
        </div>
      </div>
    </Space>
  );
};

MediaModalDetail.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  styles: PropTypes.object
};

export default MediaModalDetail;
