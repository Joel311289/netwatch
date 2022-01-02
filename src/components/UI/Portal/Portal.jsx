import { useEffect, useMemo, useContext } from 'react';
import ReactDOM from 'react-dom';
import { ThemeContext } from '../../../contexts/ThemeContext';

const Portal = ({ children, parent, className, size }) => {
  const { theme } = useContext(ThemeContext);
  const el = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    const target = parent && parent.appendChild ? parent : document.body;
    const classList = [className || 'Portal', `theme-${theme}`];

    if (className) {
      className.split(' ').forEach((item) => classList.push(item));
    }
    classList.forEach((item) => el.classList.add(item));
    el.setAttribute('data-size', size);
    target.appendChild(el);

    return () => {
      target.removeChild(el);
    };
  }, [el, parent, className]);

  return ReactDOM.createPortal(children, el);
};

export default Portal;
