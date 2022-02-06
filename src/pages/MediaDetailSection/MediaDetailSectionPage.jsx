import { useFetch } from '@hooks/useFetch';
import { useMediaPath } from '@hooks/useMediaPath';
import { useServiceMediaDetail } from '@hooks/useServiceMediaDetail';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Grid from '@components/Layout/Grid/Grid';
import Space from '@components/Layout/Space/Space';
import MediaHeading from '@components/Media/MediaHeading/MediaHeading';
import MediaResume from '@components/Media/MediaResume/MediaResume';

import { routeMediaDetail } from '@services/helpers';

import {
  apiSectionDetail,
  fetcherSectionDetail,
  resumeProps,
  sectionProps
} from '@pages/MediaDetailSection/config';
import styles from '@pages/MediaDetailSection/MediaDetailSectionPage.module.css';

const MediaDetailSectionPage = () => {
  const breakpoint = useBreakpointViewport();
  const { mediaType, id, section, sectionId } = useMediaPath([
    '/:mediaType/:key/:section',
    '/:mediaType/:key/:section/:keySection'
  ]);

  const { data, loading } = useServiceMediaDetail(mediaType, id, [section]);
  const { data: detailSection, loading: loadingSection } = useFetch(
    sectionId ? apiSectionDetail(id, sectionId)[section] : null,
    fetcherSectionDetail[section]
  );

  const { title, [section]: detail } = data;
  const resume = resumeProps({ data, detail, detailSection })[section] || {};
  const { label, length, sections } = sectionProps({ detail, detailSection })[section];

  console.log(data, detail, detailSection);

  return (
    <Space nowrap direction="column" className={styles.wrapper}>
      <div className={styles.resume}>
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
        <h2 className="heading">
          {label} {length ? `(${length})` : ''}
        </h2>

        {(detail || detailSection) &&
          sections.map(({ heading, gridProps, Element, items, props }, index) => (
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

              {Array.isArray(items) && !items.length && (
                <div className={styles.empty}>{`No se han encontrado ${(
                  heading || label
                ).toLowerCase()} para "${title}"`}</div>
              )}
            </div>
          ))}
      </div>
    </Space>
  );
};

export default MediaDetailSectionPage;
