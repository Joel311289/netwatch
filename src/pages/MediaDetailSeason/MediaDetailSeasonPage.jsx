import { useFetch } from '@hooks/useFetch';
import { useMediaPath } from '@hooks/useMediaPath';
import { useServiceMediaDetail } from '@hooks/useServiceMediaDetail';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Grid from '@components/Layout/Grid/Grid';
import Space from '@components/Layout/Space/Space';
import MediaHeading from '@components/Media/MediaHeading/MediaHeading';
import MediaResume from '@components/Media/MediaResume/MediaResume';

import { routeMediaDetail } from '@services/helpers';

import { string } from '@utils/helpers/strings';
import { isEmptyArray } from '@utils/helpers/arrays';

import { components } from '@pages/MediaDetailSeason/components';
import {
  getSection,
  resumeProps,
  sectionProps,
  serviceSection
} from '@pages/MediaDetailSeason/config';
import styles from '@pages/MediaDetailSeason/MediaDetailSeasonPage.module.css';

const MediaDetailSeasonPage = () => {
  const breakpoint = useBreakpointViewport();
  const { mediaType, id, params } = useMediaPath([
    '/:mediaType/:key/seasons/:season_number',
    '/:mediaType/:key/seasons/:season_number/episodes/:episode_number'
  ]);
  const section = getSection(params);

  const { data, loading } = useServiceMediaDetail(mediaType, id);
  // eslint-disable-next-line no-unused-vars
  const { data: detailSeason, loading: loadingSeason } = useFetch(
    ...serviceSection({ id, ...params })['seasons/detail']
  );
  // eslint-disable-next-line no-unused-vars
  const { data: detailEpisode, loading: loadingEpisode } = useFetch(
    ...serviceSection({ id, ...params })['episodes/detail']
  );

  const detail = { ...(detailSeason || {}), ...(detailEpisode || {}) };
  const { Selector, Episode } = components(data, detail, section);
  const resume = resumeProps(data, detail)[section] || {};
  const { sections } = sectionProps(data, detail)[section] || {};

  return (
    <Space
      nowrap
      direction="column"
      className={`${styles.wrapper} ${string(styles[section.replace(/\//g, '_')])}`}
    >
      <div className={`${styles.resume} theme-dark`}>
        <MediaResume skeleton={loading} route={`${routeMediaDetail(data)}`} {...resume} />
      </div>

      <div className={`App-container App-content ${styles.body}`}>
        {Selector && Selector()}

        {Episode && Episode()}

        <div>
          {(sections || []).map(
            ({ heading, gridProps, Element, items, props, emptyMessage }, index) =>
              (!isEmptyArray(items) || emptyMessage) && (
                <div className={styles.subsection} key={index}>
                  {heading && items && (
                    <div className="sub-heading">
                      <MediaHeading text={`${heading} (${items.length})`} />
                    </div>
                  )}

                  {Array.isArray(items) && (
                    <Grid {...gridProps(breakpoint)}>
                      {items.map((item, index) => (
                        <Element
                          key={index}
                          skeleton={loading}
                          route={routeMediaDetail(data)}
                          {...item}
                          {...props(item)}
                        />
                      ))}
                    </Grid>
                  )}

                  {Array.isArray(items) && !items.length && emptyMessage && (
                    <div className={styles.empty}>{emptyMessage}</div>
                  )}
                </div>
              )
          )}
        </div>
      </div>
    </Space>
  );
};

export default MediaDetailSeasonPage;
