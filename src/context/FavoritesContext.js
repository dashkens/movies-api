// FavoritesContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isAdded, setIsAdded] = useState(false); // Include isAdded state

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites-movies')) || [];
    setFavorites(storedFavorites);
  }, []);

  const addFavorite = (movie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    localStorage.setItem('favorites-movies', JSON.stringify(newFavorites));
    setIsAdded(true); 
  };

  const removeFavorite = (movie) => {
    const updatedFavorites = favorites.filter((item) => item.id !== movie.id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites-movies', JSON.stringify(updatedFavorites));
    setIsAdded(false); 
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isAdded }}>
      {children}
    </FavoritesContext.Provider>
  );
};
