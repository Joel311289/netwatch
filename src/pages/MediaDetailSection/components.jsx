import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { get } from 'lodash';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { useNavigationSeason } from '@hooks/useNavigationSeason';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Select from '@components/UI/Select/Select';
import Space from '@components/Layout/Space/Space';
import Button from '@components/UI/Button/Button';

import { routeMediaDetail } from '@services/helpers';

import styles from '@pages/MediaDetailSection/MediaDetailSectionPage.module.css';

// eslint-disable-next-line react/prop-types
const SelectorSeason = ({ initials, data, detailSection }) => {
  const route = routeMediaDetail(data);
  const season_number = get(detailSection, 'season_number');

  const history = useLocation();
  const { tablet } = useBreakpointViewport();
  const { prev, next, routePrev, routeNext } = useNavigationSeason({
    seasons: get(data, 'seasons', []),
    current_season: season_number
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

  // console.log(season_number, prev, next, routePrev, routeNext);

  const onChange = () => {
    // history
  };

  return (
    <Space classNames="full" direction="row" justify="between">
      <Select
        className={styles.selector}
        items={get(data, 'seasons', [])}
        identifierKey="season_number"
        identifierSelected={String(season_number)}
        displayKey="key"
        onChange={onChange}
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
                className={styles['navigation-button']}
              >
                <Link to={to} className={`${styles['navigation-link']} ${styles[key]}`}>
                  {React.cloneElement(Icon, { className: styles['navigation-arrow'] })}
                  {!tablet && <span className={styles['navigation-label']}>{label}</span>}
                </Link>
              </Button>
            )
        )}
      </Space>
    </Space>
  );
};

export const Selector = ({ data, detail, detailSection }, onChange) => ({
  'seasons/detail': () => {
    return (
      <SelectorSeason
        data={data}
        detailSection={detailSection}
        initials="T"
        items={get(data, 'seasons', [])}
      />
    );
  },
  'episodes/detail': () => {
    return (
      <SelectorSeason
        data={data}
        detailSection={detailSection}
        detail={detail}
        initials="E"
        items={get(data, 'episodes', [])}
      />
    );
  }
});
