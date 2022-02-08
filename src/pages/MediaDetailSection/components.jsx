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

  if (seasons.length) {
    if (season_number > first) navigation = { ...navigation, prev: season_number - 1 };
    if (season_number < last) navigation = { ...navigation, next: season_number + 1 };
    if (season_number === first) navigation = { ...navigation, prev: null };
    if (season_number === last) navigation = { ...navigation, next: null };
  }

  return navigation;
};

export const Selector = ({ data, detail, detailSection }, onChange) => ({
  'seasons/detail': () => {
    const season_number = get(detailSection, 'season_number');
    const navigation = () => getNavigationSeason({
      seasons: get(data, 'seasons', []),
      current: { season_number }
    });
    const date = get(detailSection, 'date');
    const route = routeMediaDetail(data);
    const buttonProps = {
      size: 'small',
      rounded: true,
      secondary: true
    };

    console.log(navigation());

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
          <div className={styles.indicator}>
            T{season_number} - {date}
          </div>

          <Button {...buttonProps} disabled={isNaN(navigation().prev)} className={styles['navigation-arrow']}>
            <Link to={`${route}/seasons/${navigation().prev}`}>
              <FiChevronLeft />
            </Link>
          </Button>
          <Button {...buttonProps} className={styles['navigation-link']}>
            <Link to={`${route}/seasons`}>Todas las temporadas</Link>
          </Button>
          <Button {...buttonProps} disabled={isNaN(navigation().next)} className={styles['navigation-arrow']}>
            <Link to={`${route}/seasons/${navigation().next}`}>
              <FiChevronRight />
            </Link>
          </Button>
        </Space>
      </Space>
    );
  }
});
