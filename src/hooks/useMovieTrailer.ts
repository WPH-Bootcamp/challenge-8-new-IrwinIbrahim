import { useQuery } from "@tanstack/react-query";

const API_KEY = "ac84d3c185ed46bccd02a4fdd853b748";

export function useMovieTrailer(movieId: number) {
  return useQuery({
    queryKey: ["movie-trailer", movieId],
    queryFn: async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
      );

      if (!res.ok) throw new Error("Failed to fetch trailer");

      const data = await res.json();

      return data.results.find(
        (v: any) => v.type === "Trailer" && v.site === "YouTube"
      );
    },
    enabled: !!movieId,
  });
}
