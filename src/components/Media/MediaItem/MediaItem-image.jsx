import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styled from '@emotion/styled';
import { FaExpand } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Button from '@components/UI/Button/Button';
import MediaModal from '@components/Media/MediaModal/MediaModal';

import { ElementDefaultProps, ElementPropTypes } from '@utils/constants/proptypes';

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

  const onZoom = () => setZoomed((prev) => !prev);

  const Content = () => {
    return (
      <Image
        className={`media-image-wrapper ${styles.image}`}
        ratio={ratio}
        style={{
          ...(width && !ratio && { width }),
          ...(height && !ratio && { height })
        }}
      >
        <div
          className={`${styles.content} ${classes}`}
          {...(lazy && { 'data-background': image })}
          style={{
            ...(width && { width }),
            ...(height && { height }),
            ...(!lazy && { backgroundImage: `url(${image})` })
          }}
        ></div>

        {zoom && (
          <Button className={styles.zoom} secondary={true} onClick={onZoom}>
            <FaExpand />
          </Button>
        )}
      </Image>
    );
  };

  return (
    <>
      {to && <Link to={to}>{Content(true)}</Link>}
      {!to && Content()}

      {zoom && zoomed && (
        <MediaModal
          size="auto"
          mode="image"
          image={image}
          width={type === 'backdrop' ? 1000 : 400}
          ratio={type === 'backdrop' ? 0.56 : 1.5}
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
