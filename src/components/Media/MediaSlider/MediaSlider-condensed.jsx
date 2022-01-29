import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { RiPlayFill } from 'react-icons/ri';
import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';
import { useBreakpointStyles } from '@hooks/useBreakpointStyles';

import Separator from '@components/UI/Separator/Separator';
import Button from '@components/UI/Button/Button';
import Space from '@components/Layout/Space/Space';
import Slider from '@components/Layout/Slider/Slider';
import MediaModal from '@components/Media/MediaModal/MediaModal';
import MediaItem from '@components/Media/MediaItem/MediaItem';

import { routeMediaDetail } from '@services/helpers';

import desktopStyles from '@components/Media/MediaSlider/MediaSlider-condensed.module.css';
import mobileStyles from '@components/Media/MediaSlider/MediaSlider-condensed-mobile.module.css';

const MediaSliderCondensed = ({ skeleton, items, sliderPerView }) => {
  const styles = useBreakpointStyles({ desktopStyles, mobileStyles });
  const { mobile, tablet, smallDesktop } = useBreakpointViewport();
  const [fetchModalData, setFetchModalData] = useState({});

  const subheadings = ({ date, duration }) => [date, ...(duration ? [duration] : [])];

  const ratio = useMemo(() => {
    if (mobile) return 0.7;
    if (tablet) return 0.5;
    if (smallDesktop) return 0.5;
    return 0.4;
  }, [mobile, tablet, smallDesktop]);

  const onWatch = (item) => setFetchModalData({ ...item, mode: 'video' });

  return (
    <>
      {items && (
        <Slider
          lazy
          effectFade
          autoplay
          sliderPerView={sliderPerView}
          navigation={false}
          pagination={!skeleton}
          paginationBulletsClass={styles.pagination}
          paginationBulletClass={styles['pagination-bullet']}
          paginationBulletActiveClass={styles['pagination-bullet-active']}
        >
          {items.map(({ image, backdrop, title, date, duration, description, ...item }, index) => (
            <div key={image || index} className={styles.wrapper}>
              <div className={styles.background}>
                <MediaItem skeleton={skeleton} image={backdrop} ratio={ratio} lazy />
              </div>

              {!skeleton && <div className={styles['gradient-bottom']}></div>}
              {!skeleton && <div className={styles['gradient-left']}></div>}

              {!skeleton && (
                <Space direction="column" gap={10} className={styles.info}>
                  <span className={styles.title}>{title}</span>

                  <Separator items={subheadings({ date, duration })} />

                  {!tablet && (
                    <span className={styles.description}>{description || 'Sin descripción'}</span>
                  )}

                  <Space gap={10} align="center" className={styles.actions}>
                    <button className={styles.action} onClick={() => onWatch(item)}>
                      <RiPlayFill />
                    </button>
                    <button className={styles.action}>
                      <IoMdAdd />
                    </button>

                    <Link to={routeMediaDetail(item)}>
                      <Button rounded secondary>
                        Más info
                      </Button>
                    </Link>
                  </Space>
                </Space>
              )}
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

MediaSliderCondensed.defaultProps = {
  sliderPerView: 1,
  zoom: true
};

MediaSliderCondensed.propTypes = {
  items: PropTypes.array,
  skeleton: PropTypes.bool,
  sliderPerView: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  zoom: PropTypes.bool
};

export default MediaSliderCondensed;
