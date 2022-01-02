import { FiPlay } from 'react-icons/fi';
import { BiGlobe, BiPlus, BiTv } from 'react-icons/bi';
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
  credits,
  number_seasons,
  watch_providers
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
        <div className={styles.title}>
          <h2 className={styles.heading}>{title}</h2>
          {date && duration && (
            <span className={styles.date}>
              {date}
              <span className={styles.separator}>•</span>
              {duration}
              {number_seasons && <span className={styles.separator}>•</span>}
              {number_seasons && `${number_seasons} temporada(s)`}
            </span>
          )}
        </div>
        <div className={styles.genres}>
          {(genres || []).map((genre) => (
            <Chip key={genre} text={genre} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.background} style={{ backgroundImage: `url(${backdrop})` }}></div>

      <div
        className={styles.backdrop}
        style={
          {
            // backgroundImage: `linear-gradient(to bottom, rgba(var(--divider-color-rgb), 0.8), rgba(var(--background-color-rgb), 0.8)), url(${backdrop})`
          }
        }
      >
        <div className={`${styles.content}`}>
          {Header()}

          <div className={styles.image}>
            <MediaItem image={image} width={250} ratio={1.5} />
          </div>

          {/* <MediaItem image={backdrop} width={750} ratio={0.5} /> */}

          {watch_providers && (
            <div className={styles.providers}>
              <div className={styles['provider-label']}>Disponible en:</div>
              <div className={styles['provider-items']}>
                {watch_providers.providers.map(({ id, image }) => (
                  <img key={id} src={image} className={styles['provider-item']} />
                ))}
              </div>
              <Button className={styles.action} role="link" href={watch_providers.watch_link}>
                <BiTv />
                <span className={styles.label}>Ver ahora</span>
              </Button>
            </div>
          )}

          <span className={styles.description}>{description}</span>
          <div className={styles.credits}>
            <MediaDetailCredits credits={credits} />
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
