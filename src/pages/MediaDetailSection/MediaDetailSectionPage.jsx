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

import {
  apiSectionDetail,
  fetcherSectionDetail,
  resumeProps,
  sectionProps
} from '@pages/MediaDetailSection/config';
import { Selector } from '@pages/MediaDetailSection/components';
import styles from '@pages/MediaDetailSection/MediaDetailSectionPage.module.css';

const MediaDetailSectionPage = () => {
  const breakpoint = useBreakpointViewport();
  const { mediaType, id, section, sectionId, params } = useMediaPath([
    '/:mediaType/:key/:section',
    '/:mediaType/:key/:section/:keySection',
    '/:mediaType/:key/:section/:keySection/:section/:keySection'
  ]);

  const { data, loading } = useServiceMediaDetail(mediaType, id, [section]);
  const { data: detailSection, loading: loadingSection } = useFetch(
    sectionId ? apiSectionDetail(id, params)[section] : null,
    fetcherSectionDetail[section]
  );

  const { title, [section]: detail } = data;
  const resume = resumeProps({ data, detail, detailSection })[section] || {};
  const { label, length, sections } = sectionProps({ data, detail, detailSection })[section] || {};

  const SectionSelector = Selector({ data, detail, detailSection }, () => {})[section];

  console.log(data, detailSection, section);

  return (
    <Space
      nowrap
      direction="column"
      className={`${styles.wrapper} ${string(styles[section.replace(/\//g, '_')])}`}
    >
      <div className={`${styles.resume} theme-dark`}>
        <MediaResume
          skeleton={loading}
          route={`${routeMediaDetail(data)}`}
          to={`${routeMediaDetail(data)}`}
          title={title}
          linkName="Volver a principal"
          {...data}
          {...resume}
        />
      </div>

      <div className={`App-container App-content ${styles.body}`}>
        {label && (
          <h2 className="heading">
            {label} {length ? `(${length})` : ''}
          </h2>
        )}

        {SectionSelector && SectionSelector()}

        <Space direction="column" gap={50} nowrap>
          {(detail || detailSection) &&
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
                            skeleton={!sectionId ? loading : loadingSection}
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
        </Space>
      </div>
    </Space>
  );
};

export default MediaDetailSectionPage;
