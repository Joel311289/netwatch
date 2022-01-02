import { useEffect, useReducer } from 'react';

const ACTIONS = {
  ADD: 'add',
  REMOVE: 'remove'
};

const ACTIONS_REDUCER = {
  [ACTIONS.ADD]: (state, action) => {
    const { id } = action.payload;

    console.log(`${id} added to favorites`);
    return {
      ...state,
      [id]: new Date().getTime()
    };
  },
  [ACTIONS.REMOVE]: (state, action) => {
    const { id } = action.payload;
    const { [id]: mediaId, ...rest } = state;

    console.log(`${mediaId} removed from favorites`);
    return rest;
  }
};

const favoritesReducer = (state = {}, action) => {
  const actionReducer = ACTIONS_REDUCER[action.type];

  return actionReducer ? actionReducer(state, action) : state;
};

export const useFavorites = () => {
  const storage = localStorage.getItem('favorites');
  const [favorites, dipatch] = useReducer(favoritesReducer, storage ? JSON.parse(storage) : {});

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return {
    add: (hero) => dipatch({ type: ACTIONS.ADD, payload: hero }),
    remove: (hero) => dipatch({ type: ACTIONS.REMOVE, payload: hero }),
    isFavorite: (id) => Boolean(favorites && favorites[id]),
    favorites
  };
};
