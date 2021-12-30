import { createContext } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { ContextPropTypes } from '../utils/constants';

export const FavoritesContext = createContext({});

export const FavoritesContextProvider = ({ children }) => {
  const { favorites, isFavorite, add, remove } = useFavorites();

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, add, remove }}>
      {children}
    </FavoritesContext.Provider>
  );
};

FavoritesContextProvider.propTypes = ContextPropTypes;
