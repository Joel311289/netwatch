import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { ElementDefaultProps, ElementPropTypes } from '@utils/constants/proptypes';
import { getHeightRatio } from '@utils/helpers/breakpoints';

import styles from '@components/Media/MediaItem/MediaItem.module.css';

const MediaItemImage = ({ image, width, ratio, to, lazy }) => {
  const classes = classNames.bind(styles)({
    'swiper-lazy': lazy,
    link: to
  });
  const background = lazy
    ? {
        'data-background': image
      }
    : { backgroundImage: `url(${image})` };

  const Content = () => {
    return (
      <div
        className={`media-image-wrapper ${styles.image} ${classes}`}
        {...background}
        style={{
          ...background,
          width,
          height: getHeightRatio(width, ratio)
        }}
      ></div>
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
