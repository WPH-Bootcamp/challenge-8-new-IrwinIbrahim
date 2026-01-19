import { createContext, useContext, useState, useEffect } from "react";
import type { Movie, FavoriteMovie } from "../types/movie";

const STORAGE_KEY = "favorites-movies";

type FavoritesContextType = {
  favorites: FavoriteMovie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);

  // Load dari localStorage saat pertama kali
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

  const toggleFavorite = (movie: Movie) => {
    if (favorites.find((f) => f.id === movie.id)) {
      setFavorites(favorites.filter((f) => f.id !== movie.id));
    } else {
      setFavorites([
        ...favorites,
        { ...movie, is_favorite: true, added_at: new Date().toISOString() },
      ]);
    }
  };

  const isFavorite = (id: number) => favorites.some((f) => f.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};