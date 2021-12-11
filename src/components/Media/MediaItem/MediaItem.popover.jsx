import { useState } from 'react';
import PropTypes from 'prop-types';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import MediaItem from '../MediaItem/MediaItem';
import MediaItemExtended from '../MediaItem/MediaItem.extended';

const MediaItemPopover = ({ width, ratio, title, date, description, image, backdrop, popover }) => {
  const [anchorElement, setAnchorElement] = useState(null);

  const onMouseEnterItem = (event) => setAnchorElement(event.currentTarget);
  const onMouseLeaveItem = () => setAnchorElement(null);

  return (
    <div>
      <MediaItem 
        width={width} 
        ratio={ratio} 
        image={image}
        onMouseEnter={(e) => onMouseEnterItem(e)} />
      {popover && <Menu
        sx={{
          pointerEvents: 'none',
        }}
        open={Boolean(anchorElement)}
        anchorEl={anchorElement}
        onClose={onMouseLeaveItem}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        TransitionComponent={Fade}
        disableRestoreFocus
        hideBackdrop>
        <MediaItemExtended 
          width={width * 1.1} 
          ratio={ratio * 0.5} 
          title={title} 
          date={date} 
          description={description} 
          image={backdrop}
          onMouseLeave={onMouseLeaveItem} />
      </Menu>}
    </div>
  )
};

export default MediaItemPopover;
