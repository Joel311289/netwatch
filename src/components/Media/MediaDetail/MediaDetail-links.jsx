import { BiGlobe } from 'react-icons/bi';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import { SiImdb } from 'react-icons/si';
import PropTypes from 'prop-types';

import Button from '@components/UI/Button/Button';
import Space from '@components/Layout/Space/Space';

import { MediaDefaultProps, MediaPropTypes } from '@utils/constants/proptypes';
import { string } from '@utils/helpers/strings';
import MediaHeading from '../MediaHeading/MediaHeading';

const externalLinkIcons = {
  imdb: <SiImdb />,
  facebook: <FiFacebook />,
  instagram: <FiInstagram />,
  twitter: <FiTwitter />
};

const MediaDetailLinks = ({
  styles,
  original_title,
  original_language,
  providers,
  homepage,
  external_ids
}) => {
  const data = [
    { label: 'Nombre original', value: original_title },
    { label: 'Idioma original', value: original_language }
  ];
  const actions = [
    ...(homepage
      ? [{ tooltip: 'Sitio web', icon: <BiGlobe />, role: 'link', href: homepage }]
      : []),
    ...(external_ids || [])
      .filter(({ url }) => Boolean(url))
      .map(({ id, name, url }) => ({
        tooltip: name,
        icon: externalLinkIcons[id],
        role: 'link',
        href: url,
        className: styles['external-id']
      }))
  ];

  return (
    <Space direction="column" className={styles.section}>
      <div className={styles['section-heading']}>
        <MediaHeading text="Datos" />
      </div>

      {data.map(({ label, value }) => (
        <Space key={label} direction="column" className={styles['data-item']}>
          <b>{label}:</b>
          <span>{value}</span>
        </Space>
      ))}

      <Space align="center" gap={10} className={`${styles.actions} ${styles.links}`}>
        {actions.map(
          ({ icon, tooltip, role, href, className }) =>
            icon && (
              <Button
                key={tooltip}
                secondary
                tooltip={tooltip}
                className={`${styles.link} ${string(className)}`}
                role={role}
                href={href}>
                {icon}
              </Button>
            )
        )}
      </Space>
    </Space>
  );
};

MediaDetailLinks.defaultProps = MediaDefaultProps;
MediaDetailLinks.propTypes = {
  styles: PropTypes.object,
  ...MediaPropTypes
};

export default MediaDetailLinks;
