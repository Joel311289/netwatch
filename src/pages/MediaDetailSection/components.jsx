import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import Select from '@components/UI/Select/Select';
import Space from '@components/Layout/Space/Space';
import Button from '@components/UI/Button/Button';

import { routeMediaDetail } from '@services/helpers';

import styles from '@pages/MediaDetailSection/MediaDetailSectionPage.module.css';

const getNavigationSeason = ({ seasons, current }) => {
  const { season_number } = current || {};

  const first = get(seasons, '[0].season_number');
  const last = get(seasons.reverse(), '[0].season_number');
  let navigation = { next: null, prev: null };

  console.log(first, last);

  if (seasons.length) {
    if (season_number > first) navigation = { ...navigation, prev: season_number - 1 };
    if (season_number < last) navigation = { ...navigation, next: season_number + 1 };
    if (season_number === first) navigation = { ...navigation, prev: null };
    if (season_number === last) navigation = { ...navigation, next: null };
  }

  return navigation;
};

// eslint-disable-next-line react/prop-types
const SelectorSeason = ({ data, detailSection }) => {
  const season_number = get(detailSection, 'season_number');
  const route = routeMediaDetail(data);
  const buttonProps = {
    size: 'small',
    rounded: true,
    secondary: true
  };

  const { prev, next } = getNavigationSeason({
    seasons: get(data, 'seasons', []),
    current: { season_number }
  });

  console.log(season_number, prev, next);

  const onChange = () => {};

  return (
    <Space direction="column">
      <Select
        className={styles.selector}
        items={get(data, 'seasons', [])}
        identifierKey="season_number"
        identifierSelected={String(season_number)}
        displayKey="title"
        onChange={onChange}
      />

      <Space align="center" gap={5} className={styles.navigation}>
        <div className={styles.indicator}>T{season_number}</div>

        <Button {...buttonProps} disabled={isNaN(prev)} className={styles['navigation-arrow']}>
          <Link to={`${route}/seasons/${prev}`}>
            <FiChevronLeft />{prev}
          </Link>
        </Button>
        <Button {...buttonProps} className={styles['navigation-link']}>
          <Link to={`${route}/seasons`}>Todas las temporadas</Link>
        </Button>
        <Button {...buttonProps} disabled={isNaN(next)} className={styles['navigation-arrow']}>
          <Link to={`${route}/seasons/${next}`}>
            <FiChevronRight />{next}
          </Link>
        </Button>
      </Space>
    </Space>
  );
};

export const Selector = ({ data, detail, detailSection }, onChange) => ({
  'seasons/detail': () => {
    return <SelectorSeason data={data} detailSection={detailSection} />;
  }
});
