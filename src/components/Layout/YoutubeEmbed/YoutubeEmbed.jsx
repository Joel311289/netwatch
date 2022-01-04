import PropTypes from 'prop-types';

import styles from '@components/Layout/YoutubeEmbed/YoutubeEmbed.module.css';

const YoutubeEmbed = ({ embedId }) => (
  <div className={styles.video}>
    <iframe
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;
