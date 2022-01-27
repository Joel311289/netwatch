import { BiGlobe } from 'react-icons/bi';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import { SiImdb } from 'react-icons/si';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Tooltip from '@components/UI/Tooltip/Tooltip';
import Button from '@components/UI/Button/Button';
import Space from '@components/Layout/Space/Space';
import MediaHeading from '../MediaHeading/MediaHeading';

import { MediaDefaultProps, MediaPropTypes } from '@utils/constants/proptypes';
import { string } from '@utils/helpers/strings';
import { isEmptyArray } from '@utils/helpers/arrays';

const externalLinkIcons = {
  imdb: <SiImdb />,
  facebook: <FiFacebook />,
  instagram: <FiInstagram />,
  twitter: <FiTwitter />
};

const genders = {
  male: 'Masculino',
  female: 'Femenino'
};

const MediaDetailLinks = ({
  styles,
  original_title,
  also_known_as,
  gender,
  place_of_birth,
  original_language,
  watch_providers,
  homepage,
  external_ids
}) => {
  const { providers = [] } = watch_providers || {};
  const data = [
    ...(!isEmptyArray(providers)
      ? [
          {
            label: 'Disponible en',
            content: (
              <Space gap={10}>
                {providers.map(({ image, name, id }) => (
                  <Tooltip key={image} text={name}>
                    <Link className={styles['provider-button']} to={`/providers/${id}`}>
                      <img className={styles['provider-link-logo']} src={image} />
                    </Link>
                  </Tooltip>
                ))}
              </Space>
            )
          }
        ]
      : []),
    { label: 'Nombre original', content: original_title },
    { label: 'Lugar de nacimiento', content: place_of_birth },
    { label: 'Sexo', content: genders[gender] },
    { label: 'Idioma original', content: original_language },
    {
      label: 'También conocido por',
      content: also_known_as && also_known_as.length && (
        <Space gap={4} direction="column">
          {also_known_as.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </Space>
      )
    }
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

      {data
        .filter(({ content }) => Boolean(content))
        .map(({ label, content }) => (
          <Space key={label} gap={10} direction="column" className={styles['data-item']}>
            <b>{label}:</b>
            <div>{content}</div>
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
                href={href}
              >
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
