import { useQuery } from "@tanstack/react-query";
import type { Movie, TrendingMovie } from "../types/movie";

const API_KEY = "ac84d3c185ed46bccd02a4fdd853b748";
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchNewReleaseMovies(): Promise<Movie[]> {
  const res = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch new release movies");
  }

  const data = await res.json();

  // Map Raw TMDB => Movie (Tipe utama)
  const movies: Movie[] = data.results.map((m: TrendingMovie) => ({
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

  return movies;
}

export function useNewReleaseMovies() {
  return useQuery<Movie[], Error>({
    queryKey: ["new-release-movies"],
    queryFn: fetchNewReleaseMovies,
    staleTime: 1000 * 60 * 10, // 10 menit
  });
}
