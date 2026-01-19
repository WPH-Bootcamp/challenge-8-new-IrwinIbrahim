import { useQuery } from "@tanstack/react-query";
import type { Cast, Crew } from "../types/movie";

const API_KEY = "ac84d3c185ed46bccd02a4fdd853b748";
const BASE_URL = "https://api.themoviedb.org/3";

interface CreditsResponse {
  cast: Cast[];
  crew: Crew[];
}

export function useMovieCredits(movieId: number) {
  return useQuery<CreditsResponse>({
    queryKey: ["movie-credits", movieId],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
      );

      if (!res.ok) throw new Error("Failed to fetch credits");

      return res.json();
    },
    enabled: !!movieId,
  });
}