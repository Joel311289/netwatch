import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styled from '@emotion/styled';

import { ElementDefaultProps, ElementPropTypes } from '@utils/constants/proptypes';

import styles from '@components/Media/MediaItem/MediaItem.module.css';

const Image = styled.div`
  &:before {
    padding-top: ${({ ratio }) => `${100 * ratio}%`};
  }
`;

const MediaItemImage = ({ image, ratio, to, lazy }) => {
  const classes = classNames.bind(styles)({
    'swiper-lazy': lazy,
    link: to
  });

  const Content = () => {
    return (
      <Image className={`media-image-wrapper ${styles.image}`} ratio={ratio}>
        <div
          className={`${styles.content} ${classes}`}
          {...(lazy && { 'data-background': image })}
          style={{
            ...(!lazy && { backgroundImage: `url(${image})` })
          }}
        ></div>
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
