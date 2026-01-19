import { useParams } from "react-router-dom";
import { imageUrl, BACKDROP } from "../lib/api";
import { useMovieDetail } from "../hooks/useMovieDetail";
import { useMovieCredits } from "../hooks/useMovieCredits";
import { useState } from "react";

import TrailerModal from "../components/TrailerModal";
import CastList from "../components/CastList";
import CrewInfo from "../components/CrewInfo";
import Navbar from "../components/Navbar";
import { useFavorites } from "../hooks/useFavorites";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);
  const [showTrailer, setShowTrailer] = useState(false);

  const { toggleFavorite, isFavorite } = useFavorites();
  const [animate, setAnimate] = useState(false);

  const { data: movie, isLoading, isError } = useMovieDetail(movieId);
  const { data: credits, isLoading: creditsLoading } = useMovieCredits(movieId);

  if (isLoading) {
    return <div className="text-white p-6">Loading...</div>;
  }

  if (isError || !movie) {
    return <div className="text-white p-6">Failed</div>;
  }

  const handleClick = () => {
    toggleFavorite(movie);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500); // reset animasi
  };

  return (
    <div className="text-white min-h-screen bg-black">
      <Navbar onSearch={() => {}} />

      {/* Hero / Backdrop */}
      <div
        className="pt-16 h-[60vh] bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${BACKDROP}${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute bottom-8 left-6 right-6 flex gap-6">
          <img
            src={`${imageUrl}${movie.poster_path}`}
            className="w-44 rounded-xl shadow-lg"
          />

          {/* Info */}
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold">{movie.title}</h1>

            <div className="mt-4 flex gap-4 text-sm text-gray-400">
              <span>{movie.release_date}</span>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowTrailer(true)}
                className="bg-red-600 px-6 py-2 rounded-full hover:bg-red-700 transition"
              >
                Watch Trailer
              </button>

              <button
                onClick={handleClick}
                className={`text-2xl transition-transform duration-300 ${
                  isFavorite(movie.id) ? "text-red-500" : "text-gray-400"
                } ${animate ? "scale-125" : "scale-100"}`}
              >
                ❤️
              </button>
            </div>

            <div className="mt-4 flex gap-4 text-sm text-gray-400">
              <span>⭐ {movie.vote_average.toFixed(1)}</span>
              <span>Popularity {movie.popularity}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-10">
        <p className="px-9 text-2xl font-bold">Overview</p>
        <p className="px-9 mt-3 text-gray-300">{movie.overview}</p>

        {creditsLoading && (
          <div className="px-6 py-6 text-gray-400">Loading credits...</div>
        )}

        {credits && (
          <>
            <CrewInfo crew={credits.crew} />
            <CastList cast={credits.cast} />
          </>
        )}
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <TrailerModal
          movieId={movie.id}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </div>
  );
}
