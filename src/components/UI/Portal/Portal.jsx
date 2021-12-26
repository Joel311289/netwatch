import { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useTheme } from '../../../hooks/useTheme';

const Portal = ({ children, parent, className, size }) => {
  const [theme] = useTheme();
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
