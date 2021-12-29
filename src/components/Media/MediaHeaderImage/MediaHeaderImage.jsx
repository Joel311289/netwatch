import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './MediaHeaderImage.module.css';

const MediaHeaderImage = ({ image, children }) => {
  const classes = classNames.bind(styles)({
    clear: !image
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.image} style={{ backgroundImage: `url(${image})` }}></div>
      <div className={`${styles.backdrop} ${classes}`}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

MediaHeaderImage.propTypes = {
  image: PropTypes.string,
  children: PropTypes.any
};

export default MediaHeaderImage;
