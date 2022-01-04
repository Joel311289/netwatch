import { BiPlus, BiGlobe } from 'react-icons/bi';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import { SiImdb } from 'react-icons/si';
import PropTypes from 'prop-types';

import Button from '@components/UI/Button/Button';
import Space from '@components/Layout/Space/Space';

import { MediaDefaultProps, MediaPropTypes } from '@utils/constants';

const externalLinkIcons = {
  imdb: <SiImdb />,
  facebook: <FiFacebook />,
  instagram: <FiInstagram />,
  twitter: <FiTwitter />
};

const MediaDetailLinks = ({ styles, homepage, external_ids }) => {
  const actions = [
    { tooltip: 'Añadir Mi lista', icon: <BiPlus /> },
    ...(homepage
      ? [{ tooltip: 'Sitio web', icon: <BiGlobe />, role: 'link', href: homepage }]
      : []),
    ...(external_ids || []).map(({ id, name, url }) => ({
      tooltip: name,
      icon: externalLinkIcons[id],
      role: 'link',
      href: url,
      className: styles['external-id']
    }))
  ];

  return (
    <Space align="center" gap={10} className={`${styles.actions} ${styles.links}`}>
      {actions.map(
        ({ icon, tooltip, role, href, className }) =>
          icon && (
            <Button
              key={tooltip}
              tooltip={tooltip}
              className={`${styles.link} ${className}`}
              role={role}
              href={href}
            >
              {icon}
            </Button>
          )
      )}
    </Space>
  );
};

MediaDetailLinks.defaultProps = MediaDefaultProps;
MediaDetailLinks.propTypes = {
  styles: PropTypes.object,
  ...MediaPropTypes
};

export default MediaDetailLinks;
