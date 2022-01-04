import { createContext } from 'react';

import { useAuth } from '@hooks/useAuth';

import { ContextPropTypes } from '@utils/constants/proptypes';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { user, login, logout } = useAuth();

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = ContextPropTypes;
