import { css } from '@emotion/css';

import { BREAKPOINTS } from '@utils/constants';

export const styles = css`
  ${Object.keys(BREAKPOINTS)
    .reverse()
    .map((key) => {
      const { width, itemsPerRow, spaceBetween, sizeImage } = BREAKPOINTS[key];
      return `
        ${`@media screen and (max-width: ${width}px)`} {
          --grid-gap: ${spaceBetween}px;
          --grid-item-percentage: ${100 / itemsPerRow}%;
          --grid-items-per-row: ${itemsPerRow};
          --size-image: ${sizeImage}px;
          --modal-position-top: 120px;
          --condensed-item-left: 3em;
          --condensed-item-bottom: 40px;
        }
      `;
    })}

  ${`@media screen and (max-width: ${BREAKPOINTS.xs.width}px)`} {
    --size-header: 50px;
    --padding-aside: 20px;
    --size-max: 100vw;
    --width-percentage-section: 100%;
    --modal-position-top: 50px;
    --condensed-item-left: 1.3em;
    --condensed-item-bottom: 20px;
  }

  ${`@media screen and (max-width: ${BREAKPOINTS.sm.width}px)`} {
    --size-header: 50px;
    --condensed-item-left: 1.3em;
    --condensed-item-bottom: 20px;
  }
`;
