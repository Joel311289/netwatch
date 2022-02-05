import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styled from '@emotion/styled';
import { IoMdExpand } from 'react-icons/io';
import { CgImage } from 'react-icons/cg';
import PropTypes from 'prop-types';

import MediaModal from '@components/Media/MediaModal/MediaModal';

import { ElementDefaultProps, ElementPropTypes } from '@utils/constants/proptypes';
import { backgroundImageUrl } from '@utils/helpers/strings';

import styles from '@components/Media/MediaItem/MediaItem.module.css';

const Image = styled.div`
  &:before {
    padding-top: ${({ ratio }) => (ratio ? `${100 * ratio}%` : '0')};
  }
`;

const MediaItemImage = ({ type, image, ratio, to, lazy, width, height, zoom }) => {
  const [zoomed, setZoomed] = useState(false);
  const classes = classNames.bind(styles)({
    'swiper-lazy': lazy,
    link: to
  });

  const onZoom = (event) => {
    event && event.stopPropagation();
    setZoomed((prev) => !prev);
  };

  const Content = () => {
    return (
      <Image
        className={`media-image-wrapper ${styles.image} ${zoom && image && styles.zoomable}`}
        ratio={ratio}
        style={{
          ...(width && !ratio && { width }),
          ...(height && { height })
        }}
        onClick={() => setZoomed(true)}
      >
        <div
          className={`${styles.content} ${classes}`}
          {...(lazy && { 'data-background': image })}
          style={{
            ...(!lazy && { backgroundImage: backgroundImageUrl(image) })
          }}
        >
          {!image && <CgImage className={styles.empty} />}
        </div>

        <div className={styles.actions}>
          {zoom && (
            <button className={styles.action} onClick={onZoom}>
              <IoMdExpand />
            </button>
          )}
        </div>
      </Image>
    );
  };

  return (
    <>
      {to && <Link to={to}>{Content()}</Link>}
      {!to && Content()}

      {zoom && zoomed && image && (
        <MediaModal
          size="auto"
          mode="image"
          image={image}
          width={ratio < 1 || type === 'backdrop' ? 1000 : 400}
          ratio={ratio ? ratio : type === 'backdrop' ? 0.56 : 1.5}
          onClose={onZoom}
        />
      )}
    </>
  );
};

MediaItemImage.defaultProps = {
  type: 'poster',
  ...ElementDefaultProps
};
MediaItemImage.propTypes = {
  type: PropTypes.oneOf(['poster', 'backdrop']),
  zoom: PropTypes.bool,
  ...ElementPropTypes
};

export default MediaItemImage;
