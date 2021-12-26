import { createContext } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { user, login, logout } = useAuth();

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.array,
};
