import { createContext, useState } from 'react';

import { ContextPropTypes } from '@utils/constants';

export const ContainerContext = createContext({});

export const ContainerContextProvider = ({ children }) => {
  const [container, setContainer] = useState(null);

  return (
    <ContainerContext.Provider value={{ container, setContainer }}>
      {children}
    </ContainerContext.Provider>
  );
};

ContainerContextProvider.propTypes = ContextPropTypes;
