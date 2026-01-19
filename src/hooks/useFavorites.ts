import { useState, useEffect } from "react";
import type { Movie, FavoriteMovie } from "../types/movie";

const STORAGE_KEY = "favorites-movies";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);

  // Load dari localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Simpan ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie: Movie) => {
    if (!favorites.find((f) => f.id === movie.id)) {
      setFavorites([
        ...favorites,
        { ...movie, is_favorite: true, added_at: new Date().toISOString() },
      ]);
    }
  };

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((f) => f.id !== id));
  };

  const toggleFavorite = (movie: Movie) => {
    if (favorites.find((f) => f.id === movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const isFavorite = (id: number) => {
    return favorites.some((f) => f.id === id);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
};