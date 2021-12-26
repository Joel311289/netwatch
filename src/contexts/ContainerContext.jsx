import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ContainerContext = createContext({});

export const ContainerContextProvider = ({ children }) => {
  const [container, setContainer] = useState(null);

  return (
    <ContainerContext.Provider value={{ container, setContainer }}>
      {children}
    </ContainerContext.Provider>
  );
};

ContainerContextProvider.propTypes = {
  children: PropTypes.object
};
