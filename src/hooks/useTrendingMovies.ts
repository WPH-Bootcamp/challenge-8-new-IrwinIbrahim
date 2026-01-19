import { useQuery } from "@tanstack/react-query";
import type { Movie, TrendingMovie } from "../types/movie";

const API_KEY = "ac84d3c185ed46bccd02a4fdd853b748";
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

export const useTrendingMovies = () => {
  return useQuery<Movie[], Error>({
    queryKey: ["trending-movies"],
    queryFn: async () => {
      const res = await fetch(TRENDING_URL);
      if (!res.ok) throw new Error("Failed to fetch trending movies");
      const data = await res.json();

      return data.results.map((m: TrendingMovie): Movie => ({
        id: m.id,

        title: m.title,
        original_title: m.original_title ?? m.title,

        overview: m.overview ?? "",

        poster_path: m.poster_path,
        backdrop_path: m.backdrop_path,

        release_date: m.release_date ?? "-",
        vote_average: m.vote_average ?? 0,
        vote_count: m.vote_count ?? 0,

        popularity: m.popularity ?? 0,
      }));
    },
  });
};
