import type { Movie } from "../types/movie";

interface FavoritesListProps {
  movies: Movie[];
}

export default function FavoritesList({ movies }: FavoritesListProps) {
  return (
    <section className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">Favorites</h2>
      <div className="space-y-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-900 rounded-lg p-4 flex items-start justify-between shadow-md"
          >
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">{movie.title}</h3>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                {movie.overview}
              </p>
              <div className="mt-2 text-yellow-400 text-sm">
                ⭐ {movie.vote_average}/10
              </div>
            </div>
            <div className="flex flex-col items-end ml-4">
              <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded mb-2">
                Watch Trailer
              </button>
              <button className="text-red-500 hover:text-red-400">❤️</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
