import { useState } from "react";
import HeroMovie from "../components/HeroMovie";
import TrendingList from "../components/TrendingList";
import NewReleaseList from "../components/NewReleaseList";
import Navbar from "../components/Navbar";

import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { useNewReleaseMovies } from "../hooks/useNewReleaseMovies";

import type { Movie } from "../types/movie";

export default function Home() {
  const [query, setQuery] = useState("");

  const {
    data: trendingMovies,
    isLoading: trendingLoading,
    isError: trendingError,
  } = useTrendingMovies();

  const {
    data: searchResults,
    isLoading: searchLoading,
    isError: searchError,
  } = useSearchMovies(query);

  const {
    data: newReleaseMovies,
    isLoading: newReleaseLoading,
    isError: newReleaseError,
  } = useNewReleaseMovies();

  const moviesToDisplay: Movie[] | undefined =
    query && searchResults ? searchResults : trendingMovies;

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar onSearch={setQuery} />

      <main>
        {query && searchLoading && (
          <div className="px-4 py-4">Searching...</div>
        )}
        {query && searchError && (
          <div className="px-4 py-4">Error searching movies.</div>
        )}

        {!query && trendingLoading && (
          <div className="px-4 py-4">Loading trending movies...</div>
        )}
        {!query && trendingError && (
          <div className="px-4 py-4">Failed to load trending movies.</div>
        )}

        {moviesToDisplay && moviesToDisplay.length > 0 && (
          <>
            <HeroMovie movie={moviesToDisplay[0]} />

            <TrendingList movies={moviesToDisplay} />

            {/* New Release (Hanya saat tidak search) */}
            {!query && (
              <>
                {newReleaseLoading && (
                  <div className="px-4 py-4">Loading new releases...</div>
                )}
                {newReleaseError && (
                  <div className="px-4 py-4">Failed to load new releases.</div>
                )}
                {newReleaseMovies && (
                  <NewReleaseList movies={newReleaseMovies} />
                )}
              </>
            )}
          </>
        )}

        {/* Empty */}
        {moviesToDisplay && moviesToDisplay.length === 0 && (
          <div className="px-4 mt-6 text-gray-300">No movies found.</div>
        )}
      </main>
    </div>
  );
}
