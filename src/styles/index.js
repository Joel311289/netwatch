import { css } from '@emotion/css';

import { BREAKPOINTS } from '@utils/constants';

export const styles = css`
  ${Object.keys(BREAKPOINTS)
    .reverse()
    .map((key) => {
      const { width, itemsPerRow, spaceBetween } = BREAKPOINTS[key];
      return `
      ${`@media screen and (max-width: ${width}px)`} {
        --grid-gap: ${spaceBetween}px;
        --grid-item-percentage: ${100 / itemsPerRow}%;
        --grid-items-per-row: ${itemsPerRow};
      }
    `;
    })}

  ${`@media screen and (max-width: ${BREAKPOINTS.xs.width}px)`} {
    --size-header: 50px;
    --padding-aside: 20px;
    --width-percentage-section: 100%;
  }
`;
