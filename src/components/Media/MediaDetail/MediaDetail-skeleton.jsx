import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Slider from '@components/Layout/Slider/Slider';
import Skeleton from '@components/UI/Skeleton/Skeleton';
import Space from '@components/Layout/Space/Space';

import { getEmptyArray } from '@utils/helpers/arrays';
import { getWidthRatio } from '@utils/helpers/breakpoints';

const MediaDetailSkeleton = ({ styles }) => {
  const { mobile, smallDesktop } = useBreakpointViewport();
  const imageWidth = () => {
    return getWidthRatio(imageHeight(210), 1.5);
  };
  const imageHeight = (mobileHeight) => {
    if (mobile) return mobileHeight;
    if (smallDesktop) return 300;
    return 375;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.header} style={{ marginTop: 20, marginBottom: 20 }}>
          <Skeleton width={280} height={30} />
          <Skeleton variant="text" width={180} height={15} style={{ marginTop: 5 }} />
        </div>

        <div
          className={styles.images}
          style={{ gridTemplateColumns: mobile ? 'auto' : `${imageWidth()}px auto` }}
        >
          <div className={styles.image} style={{ width: imageWidth(), height: imageHeight(210) }}>
            <Skeleton height="100%" />
          </div>
        </div>

        <div className={`${styles.extras} ${styles.section}`}>
          <div className={styles['section-heading']} style={{ marginTop: mobile ? 20 : 0 }}>
            <Skeleton width={200} height={30} />
          </div>
          {getEmptyArray(2).map((_, index) => (
            <Space key={index} gap={10} direction="column" className={styles['data-item']}>
              <Skeleton height={25} width={150} />
              <Skeleton height={20} width={250} />
              <Skeleton height={20} width={250} />
            </Space>
          ))}
          <div style={{ marginTop: 25 }}>
            <Space gap={10} className={`${styles.actions} ${styles.links}`}>
              {getEmptyArray(5).map((_, index) => (
                <Skeleton key={index} variant="circular" width={40} height={40} />
              ))}
            </Space>
          </div>
        </div>

        <div className={`${styles.section} ${styles[`section-1`]}`}>
          <div className={styles['section-heading']}>
            <Skeleton width={200} height={30} />
          </div>
          <Space direction="column" gap={10}>
            <Skeleton height={25} />
            <Skeleton height={25} />
            <Skeleton height={25} />
          </Space>
        </div>

        {getEmptyArray(2).map((_, index) => (
          <div key={index} className={`${styles.section} ${styles[`section-${index + 2}`]}`}>
            <div className={styles['section-heading']}>
              <Skeleton width={200} height={30} />
            </div>

            {!mobile && (
              <Slider sliderPerView={mobile ? 1 : 2}>
                <Skeleton height={200} />
                <Skeleton height={200} />
              </Slider>
            )}

            {mobile && <Skeleton height={200} />}
          </div>
        ))}
      </div>
    </div>
  );
};

MediaDetailSkeleton.propTypes = {
  styles: PropTypes.object
};

export default MediaDetailSkeleton;
