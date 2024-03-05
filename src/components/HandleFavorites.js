// HandleFavorites.js

import React from 'react';
import { useFavorites } from '../context/FavoritesContext';

const HandleFavorites = ({ movie }) => {
  const { addFavorite, removeFavorite, isAdded } = useFavorites();

  const handleToggleFavorite = () => {
    if (isAdded) {
      removeFavorite(movie);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div onClick={handleToggleFavorite}>
      <p>{isAdded ? 'Remove from Favorites' : 'Add to Favorites'} <i className={!isAdded ? "bi bi-heart-fill" : "bi bi-x-lg"}></i></p>
    </div>
  );
};

export default HandleFavorites;
