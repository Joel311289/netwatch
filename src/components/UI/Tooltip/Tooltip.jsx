import TooltipMUI from '@mui/material/Tooltip';
import PropTypes from 'prop-types';

import styles from '@components/UI/Tooltip/Tooltip.module.css';

const Tooltip = ({ text, children }) => {
  return (
    <TooltipMUI
      title={text}
      classes={{ tooltip: styles.tooltip }}
      PopperProps={{
        disablePortal: true
      }}
      arrow>
      {children}
    </TooltipMUI>
  );
};

Tooltip.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node
};

export default Tooltip;
