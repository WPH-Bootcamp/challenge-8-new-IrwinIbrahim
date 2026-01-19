import { useQuery } from "@tanstack/react-query";
import type { Movie, TrendingMovie } from "../types/movie";

const API_KEY = "ac84d3c185ed46bccd02a4fdd853b748";

export const useSearchMovies = (query: string) => {
  return useQuery<Movie[], Error>({
    queryKey: ["search-movies", query],
    queryFn: async () => {
      if (!query) return []; // jika kosong, return array kosong

      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
      );

      if (!res.ok) throw new Error("Failed to search movies");

      const data = await res.json();

      return data.results.map((m: TrendingMovie) => ({
        id: m.id,
        title: m.title,
        original_title: m.original_title || m.title,
        overview: m.overview || "",
        poster_path: m.poster_path,
        backdrop_path: m.backdrop_path,
      }));
    },
    enabled: !!query, // query hanya aktif kalau ada kata pencarian
  });
};
