import { createContext } from 'react';
import PropTypes from 'prop-types';
import { useFavorites } from '../hooks/useFavorites';

export const FavoritesContext = createContext({});

export const FavoritesContextProvider = ({ children }) => {
  const { favorites, isFavorite, add, remove } = useFavorites();

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, add, remove }}>
      {children}
    </FavoritesContext.Provider>
  );
};

FavoritesContextProvider.propTypes = {
  children: PropTypes.array
};
