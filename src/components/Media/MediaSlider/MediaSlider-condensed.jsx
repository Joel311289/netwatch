import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Space from '@components/Layout/Space/Space';
import Slider from '@components/Layout/Slider/Slider';
import MediaModal from '@components/Media/MediaModal/MediaModal';
import MediaItem from '@components/Media/MediaItem/MediaItem';

import { routeMediaDetail } from '@services/helpers';

import styles from '@components/Media/MediaSlider/MediaSlider-condensed.module.css';

const MediaCondensedSlider = ({ skeleton, items, sliderPerView }) => {
  const [fetchModalData, setFetchModalData] = useState({});

  return (
    <>
      {items && (
        <Slider
          lazy
          effectFade
          sliderPerView={sliderPerView}
          navigation={!skeleton}
          navigationClass={styles.navigation}
          paginationBulletsClass={styles.pagination}
        >
          {items.map(({ image, backdrop, title, date, ...item }, index) => (
            <div key={image || index} className={styles.wrapper}>
              <div className={styles.background}>
                <MediaItem
                  skeleton={skeleton}
                  image={backdrop}
                  ratio={0.3}
                  lazy
                  zoom
                  to={routeMediaDetail(item)}
                  {...item}
                />
              </div>

              <Space gap={20} nowrap className={styles.item}>
                {!skeleton && <MediaItem image={image} width={200} ratio={1.5} />}
              </Space>

              <Space direction="column" gap={10} className={styles.info}>
                <Link className={styles.title} to={routeMediaDetail(item)}>
                  {title}
                </Link>
                <span className={styles.date}>{date}</span>
              </Space>
            </div>
          ))}
        </Slider>
      )}
      {fetchModalData.id && (
        <MediaModal size="m" {...fetchModalData} onClose={() => setFetchModalData({})} />
      )}
    </>
  );
};

MediaCondensedSlider.defaultProps = {
  sliderPerView: 1,
  zoom: true
};

MediaCondensedSlider.propTypes = {
  items: PropTypes.array,
  skeleton: PropTypes.bool,
  sliderPerView: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  zoom: PropTypes.bool
};

export default MediaCondensedSlider;
