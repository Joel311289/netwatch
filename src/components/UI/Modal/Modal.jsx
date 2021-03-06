import { useEffect, useRef, useState } from 'react';
import { FiX } from 'react-icons/fi';
import PropTypes from 'prop-types';

import Portal from '@components/UI/Portal/Portal';

import { sleep } from '@utils/helpers';

import styles from '@components/UI/Modal/Modal.module.css';

const Modal = ({ children, visible, locked, size, onClose, position }) => {
  const [active, setActive] = useState(false);
  const backdrop = useRef(null);

  useEffect(() => {
    const { current } = backdrop;
    const transitionEnd = () => setActive(visible);
    const keyHandler = (e) => !locked && [27].indexOf(e.which) >= 0 && onClose();
    const clickHandler = (e) => !locked && e.target === current && onClose();

    const handleVisible = async () => {
      await sleep(10);
      document.activeElement.blur();
      setActive(visible);
      document.querySelector('#root').setAttribute('inert', 'true');
    };

    if (current) {
      current.addEventListener('transitionend', transitionEnd);
      current.addEventListener('click', clickHandler);
      window.addEventListener('keyup', keyHandler);
    }
    if (visible) {
      handleVisible();
    }

    return () => {
      if (current) {
        current.removeEventListener('transitionend', transitionEnd);
        current.removeEventListener('click', clickHandler);
      }
      document.querySelector('#root').removeAttribute('inert');
      window.removeEventListener('keyup', keyHandler);
    };
  }, [visible, locked, onClose]);

  return (
    (visible || active) && (
      <Portal
        className="Modal"
        parent={document.getElementById('root')}
        size={size}
        position={position}
      >
        <div ref={backdrop} className={`${styles.backdrop} ${active && visible && styles.active}`}>
          <div className={styles['modal-content']}>
            <button className={styles.close} onClick={onClose}>
              <FiX />
            </button>
            {children}
          </div>
        </div>
      </Portal>
    )
  );
};

Modal.defaultProps = {
  visible: false,
  locked: false,
  size: 'm',
  onClose: () => {}
};
Modal.propTypes = {
  children: PropTypes.any,
  visible: PropTypes.bool,
  locked: PropTypes.bool,
  position: PropTypes.oneOf(['top', 'center', 'auto']),
  size: PropTypes.oneOf(['s', 'm', 'l', 'auto']),
  onClose: PropTypes.func
};

export default Modal;
