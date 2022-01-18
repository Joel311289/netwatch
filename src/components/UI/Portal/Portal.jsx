import { useEffect, useMemo, useContext } from 'react';
import ReactDOM from 'react-dom';

import { ThemeContext } from '@contexts/ThemeContext';

import { styles } from '@styles';

const Portal = ({ children, parent, className, size, position }) => {
  const { theme } = useContext(ThemeContext);
  const el = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    const target = parent && parent.appendChild ? parent : document.body;
    const classList = [className || 'Portal', `theme-${theme}`, styles];

    if (className) {
      className.split(' ').forEach((item) => classList.push(item));
    }
    classList.forEach((item) => el.classList.add(item));
    el.setAttribute('data-size', size);
    el.setAttribute('data-position', position || 'center');
    target.appendChild(el);

    return () => {
      target.removeChild(el);
    };
  }, [el, parent, className]);

  return ReactDOM.createPortal(children, el);
};

export default Portal;
