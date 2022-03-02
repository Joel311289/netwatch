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

import { skeleton } from '@pages/MediaDetailSection/components';
import { sectionProps } from '@pages/MediaDetailSection/config';
import styles from '@pages/MediaDetailSection/MediaDetailSectionPage.module.css';

const MediaDetailSectionPage = () => {
  const breakpoint = useBreakpointViewport();
  const { mediaType, id, section } = useMediaPath(['/:mediaType/:key/:section']);
  const { data, loading } = useServiceMediaDetail(mediaType, id, [section]);

  const ElementSkeleton = skeleton(breakpoint, section);
  const { title, [section]: detail } = data;
  const { label, length, sections } = sectionProps(data, section);

  return (
    <Space
      nowrap
      direction="column"
      className={`${styles.wrapper} ${string(styles[section.replace(/\//g, '_')])}`}
    >
      <div className={`${styles.resume} ${!loading && 'theme-dark'}`}>
        <MediaResume
          skeleton={loading}
          route={`${routeMediaDetail(data)}`}
          to={`${routeMediaDetail(data)}`}
          title={title}
          linkName="Volver a principal"
          {...data}
        />
      </div>

      {loading && ElementSkeleton && ElementSkeleton()}

      {!loading && (
        <div className={`App-container App-content ${styles.body}`}>
          {label && (
            <h2 className="heading">
              {label} {length ? `(${length})` : ''}
            </h2>
          )}

          {detail &&
            (sections || []).map(
              ({ heading, gridProps, Element, items, props, emptyMessage }, index) =>
                (!isEmptyArray(items) || emptyMessage) && (
                  <div className={styles.subsection} key={index}>
                    {heading && (
                      <div className="sub-heading">
                        <MediaHeading text={heading} />
                      </div>
                    )}

                    {Array.isArray(items) && (
                      <Grid {...gridProps(breakpoint)}>
                        {items.map((item, index) => (
                          <Element
                            key={index}
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
      )}
    </Space>
  );
};

export default MediaDetailSectionPage;
