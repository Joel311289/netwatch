import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styled from '@emotion/styled';

import { ElementDefaultProps, ElementPropTypes } from '@utils/constants/proptypes';

import styles from '@components/Media/MediaItem/MediaItem.module.css';

const Image = styled.div`
  &:before {
    padding-top: ${({ ratio }) => (ratio ? `${100 * ratio}%` : '0')};
  }
`;

const MediaItemImage = ({ image, ratio, to, lazy, width, height }) => {
  const classes = classNames.bind(styles)({
    'swiper-lazy': lazy,
    link: to
  });

  const Content = () => {
    return (
      <Image
        className={`media-image-wrapper ${styles.image}`}
        ratio={ratio}
        style={{
          ...(width && !ratio && { width }),
          ...(height && !ratio && { height })
        }}>
        <div
          className={`${styles.content} ${classes}`}
          {...(lazy && { 'data-background': image })}
          style={{
            ...(width && { width }),
            ...(height && { height }),
            ...(!lazy && { backgroundImage: `url(${image})` })
          }}></div>
      </Image>
    );
  };

  return (
    <>
      {to && <Link to={to}>{Content(true)}</Link>}
      {!to && Content()}
    </>
  );
};

MediaItemImage.defaultProps = ElementDefaultProps;
MediaItemImage.propTypes = ElementPropTypes;

export default MediaItemImage;
