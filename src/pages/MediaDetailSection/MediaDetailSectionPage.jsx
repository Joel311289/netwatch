import { useMediaPath } from '@hooks/useMediaPath';
import { useServiceMediaDetail } from '@hooks/useServiceMediaDetail';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Grid from '@components/Layout/Grid/Grid';
import Space from '@components/Layout/Space/Space';
import MediaHeading from '@components/Media/MediaHeading/MediaHeading';
import MediaResume from '@components/Media/MediaResume/MediaResume';

import { routeMediaDetail } from '@services/helpers';

import { sectionProps } from '@pages/MediaDetailSection/config';
import styles from '@pages/MediaDetailSection/MediaDetailSectionPage.module.css';

const MediaDetailSectionPage = () => {
  const breakpoint = useBreakpointViewport();
  const { mediaType, id, section } = useMediaPath();
  const { data, loading } = useServiceMediaDetail(mediaType, id, [section]);

  const { title, [section]: detail } = data;
  const { label, sections } = sectionProps[section];

  console.log(section, data, detail);

  return (
    <Space nowrap direction="column" className={styles.wrapper}>
      <div className={styles.resume}>
        <MediaResume
          skeleton={loading}
          to={`${routeMediaDetail(data)}`}
          title={title}
          linkName="Volver a principal"
          {...data}
        />
      </div>

      <div className={`App-container App-content ${styles.body}`}>
        <h2 className="heading">{label}</h2>

        {detail &&
          sections(detail).map(({ heading, gridProps, Element, items, props }, index) => (
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
                      skeleton={loading}
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
