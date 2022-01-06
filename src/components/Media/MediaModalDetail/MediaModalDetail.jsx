import { Link as LinkRouter } from 'react-router-dom';

import { useBreakpointStyles } from '@hooks/useBreakpointStyles';
import { useFetch } from '@hooks/useFetch';

import Link from '@components/UI/Link/Link';
import Space from '@components/Layout/Space/Space';
import MediaItem from '@components/Media/MediaItem/MediaItem';
import MediaDetail from '@components/Media/MediaDetail/MediaDetail';
import MediaModalDetailSkeleton from '@components/Media/MediaModalDetail/MediaModalDetail-skeleton';

import { mediaTypes, apiUrl } from '@services/constants';
import { routeMediaDetail } from '@services/helpers';
import { getDetailMovie } from '@services/movies/get-detail-movie';
import { getDetailSerie } from '@services/series/get-detail-serie';

import { ElementPropTypes, MediaPropTypes } from '@utils/constants/proptypes';
import { truncatedText } from '@utils/helpers/strings';

import desktopStyles from '@components/Media/MediaModalDetail/MediaModalDetail.module.css';
import mobileStyles from '@components/Media/MediaModalDetail/MediaModalDetail-mobile.module.css';

const fetcherDetail = (type) => (type === mediaTypes.MOVIE ? getDetailMovie : getDetailSerie);

const MediaModalDetail = ({ type, id }) => {
  const styles = useBreakpointStyles({ desktopStyles, mobileStyles });
  const response = useFetch(`${apiUrl}/${type}/${id}`, fetcherDetail(type));
  const { data, loading: skeleton } = response;
  const { image, title, description, backdrop } = data || {};

  if (skeleton) {
    return <MediaModalDetailSkeleton styles={styles} />;
  }

  return (
    <Space gap={25} className={styles.wrapper}>
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
  ...ElementPropTypes,
  ...MediaPropTypes
};

MediaDetail.Skeleton = MediaModalDetailSkeleton;

export default MediaModalDetail;
