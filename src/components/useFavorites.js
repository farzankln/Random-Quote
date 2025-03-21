import { useState, useEffect } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (quote) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.content === quote.content);
    
    const updatedFavorites = isAlreadyFavorite
      ? favorites.filter((fav) => fav.content !== quote.content)
      : [...favorites, quote];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return { favorites, toggleFavorite };
};

export default useFavorites;
