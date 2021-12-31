import { FiPlay } from 'react-icons/fi';
import { BiGlobe, BiPlus } from 'react-icons/bi';
import { useBreakpointStyles } from '../../../hooks/useBreakpointStyles';
import MediaItem from '../MediaItem/MediaItem';
import MediaDetailSkeleton from './MediaDetail.skeleton';
import MediaDetailCredits from './MediaDetailCredits';
import Chip from '../../UI/Chip/Chip';
import Button from '../../UI/Button/Button';
import { MediaDefaultProps, MediaPropTypes } from '../../../utils/constants';
import desktopStyles from './MediaDetail.module.css';
import mobileStyles from './MediaDetail.mobile.module.css';

const MediaDetail = ({
  skeleton,
  title,
  description,
  image,
  backdrop,
  genres,
  duration,
  date,
  cast,
  directors,
  writers
}) => {
  const styles = useBreakpointStyles(desktopStyles, mobileStyles);
  const actions = [
    { label: 'Ver trailer', icon: <FiPlay /> },
    { tooltip: 'Añadir Mi lista', icon: <BiPlus /> },
    { tooltip: 'Sitio web', icon: <BiGlobe /> }
  ];

  if (skeleton) {
    return <MediaDetailSkeleton />;
  }

  const Header = () => {
    return (
      <div className={styles.header}>
        <h2 className={styles.heading}>{title}</h2>
        {date && duration && (
          <span className={styles.date}>
            {date} - {duration}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.background} style={{ backgroundImage: `url(${backdrop})` }}></div>

      <div className={styles.backdrop}>
        <div className={`${styles.content}`}>
          {Header()}

          <div className={styles.image}>
            <MediaItem image={image} width={250} ratio={1.5} />
          </div>

          <div className={styles.genres}>
            {(genres || []).map((genre) => (
              <Chip key={genre} text={genre} />
            ))}
          </div>

          <span className={styles.description}>{description}</span>
          <div className={styles.credits}>
            <MediaDetailCredits cast={cast} directors={directors} writers={writers} />
          </div>

          <div className={styles.actions}>
            {actions.map(({ label, icon, tooltip }, index) => (
              <Button key={index} tooltip={tooltip} className={styles.action}>
                {icon}
                <span className={styles.label}>{label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

MediaDetail.defaultProps = MediaDefaultProps;
MediaDetail.propTypes = MediaPropTypes;

export default MediaDetail;
