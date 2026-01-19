import { useQuery } from "@tanstack/react-query";
import type { Movie } from "../types/movie";

const API_KEY = "ac84d3c185ed46bccd02a4fdd853b748";

type Genre = {
  id: number;
  name: string;
};

export const useMovieDetail = (movieId: number | null) => {
  return useQuery<Movie>({
    queryKey: ["movie-detail", movieId],
    enabled: !!movieId,
    queryFn: async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
      );

      if (!res.ok) throw new Error("Failed to fetch movie detail");

      const m = await res.json();

      return {
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

        runtime: m.runtime ?? 0,
        genres: m.genres?.map((g: Genre) => g.name) ?? [],
      };
    },
  });
};
