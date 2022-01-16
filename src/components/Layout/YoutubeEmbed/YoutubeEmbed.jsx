import PropTypes from 'prop-types';

import styles from '@components/Layout/YoutubeEmbed/YoutubeEmbed.module.css';

const YoutubeEmbed = ({ embedId, autoplay }) => (
  <div className={styles.youtube}>
    <iframe
      src={`https://www.youtube.com/embed/${embedId}?autoplay=${Number(autoplay)}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.defaultProps = {
  autoplay: false
};

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
  autoplay: PropTypes.bool
};

export default YoutubeEmbed;
