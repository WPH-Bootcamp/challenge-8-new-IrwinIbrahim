import type { Movie } from "../types/movie";
import { useNavigate } from "react-router-dom";

interface Props {
  movies: Movie[];
}

export default function NewReleaseList({ movies }: Props) {
  const navigate = useNavigate();
  return (
    <section className="px-5 mt-12">
      <h2 className="text-xl font-semibold mb-6">New Release</h2>

      <div
        className="
          grid gap-4
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
        "
      >
        {movies.map((movie) => (
          <div key={movie.id} className="group cursor-pointer">
            <div
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="relative overflow-hidden rounded-lg"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="
                  w-full h-full object-cover
                  transition-transform duration-300
                  group-hover:scale-105
                "
              />

              <div
                className="
                absolute inset-0
                bg-black/60
                opacity-0
                group-hover:opacity-100
                transition
                flex items-end
                p-2
              "
              >
                <p className="text-xs text-white line-clamp-2">{movie.title}</p>
              </div>
            </div>

            <p className="mt-2 text-sm line-clamp-2">{movie.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
