import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { get } from 'lodash';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { useNavigationSeason } from '@hooks/useNavigationSeason';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Select from '@components/UI/Select/Select';
import Space from '@components/Layout/Space/Space';
import Button from '@components/UI/Button/Button';
import MediaItemImage from '@components/Media/MediaItem/MediaItem-image';

import { routeMediaDetail, routeSeasonDetail } from '@services/helpers';

import styles from '@pages/MediaDetailSeason/MediaDetailSeasonPage.module.css';

// eslint-disable-next-line react/prop-types
const Skeleton = ({ loading, loadingDetail }) => {
  const route = routeMediaDetail(data);
  const season_number = get(detail, 'season_number');
  const episode_number = get(detail, 'episode_number');

  const history = useHistory();
  const { tablet } = useBreakpointViewport();
  const { prev, next, routePrev, routeNext } = useNavigationSeason({
    seasons: get(data, 'seasons', []),
    current_season: season_number,
    current_episode: episode_number
  });
  const buttons = [
    {
      key: 'prev',
      to: `${route}/${routePrev}`,
      Icon: <FiChevronLeft />,
      label: `${initials}. Anterior`,
      visible: Boolean(prev)
    },
    {
      key: 'next',
      to: `${route}/${routeNext}`,
      Icon: <FiChevronRight />,
      label: `${initials}. Siguiente`,
      visible: Boolean(next)
    }
  ];

  const onChange = (event) => history.push(`${route}/${routeSeasonDetail(event)}`);

  return (
    <Space
      classNames="full"
      direction="row"
      justify="between"
      className={`${styles.selector} ${tablet && styles.tablet}`}
    >
      <Select
        className={styles['selector-button']}
        items={items}
        identifierKey={identifierKey}
        identifierSelected={get(detail, identifierKey)}
        displayKey="key"
        onChange={onChange}
        hideArrow
      />

      <Space align="center" gap={5} className={styles.navigation}>
        {buttons.map(
          ({ key, visible, to, Icon, label }) =>
            visible && (
              <Button
                key={key}
                size="small"
                secondary
                rounded
                className={`${styles['navigation-button']} ${styles[key]}`}
              >
                <Link to={to} className={styles['navigation-link']}>
                  {React.cloneElement(Icon, { className: styles['navigation-arrow'] })}
                  <span className={styles['navigation-label']}>{label}</span>
                </Link>
              </Button>
            )
        )}
      </Space>
    </Space>
  );
};
