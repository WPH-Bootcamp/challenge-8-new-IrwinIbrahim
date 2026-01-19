import { X } from "lucide-react";
import { useMovieDetail } from "../hooks/useMovieDetail";
import { BACKDROP } from "../lib/api";
import { useMovieCredits } from "../hooks/useMovieCredits";
import CastList from "./CastList";
import CrewInfo from "./CrewInfo";

interface Props {
  movieId: number;
  onClose: () => void;
}

export default function MovieDetailModal({ movieId, onClose }: Props) {
  const { data } = useMovieDetail(movieId);
  const { data: credits } = useMovieCredits(movieId);

  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
      <button onClick={onClose} className="fixed top-6 right-6 text-white">
        <X size={28} />
      </button>

      <div className="max-w-4xl mx-auto mt-24 bg-black rounded-lg overflow-hidden">
        <img
          src={`${BACKDROP}${data.backdrop_path}`}
          className="w-full h-64 object-cover"
        />

        <div className="p-6 text-white">
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="text-gray-400 mt-2">{data.release_date}</p>

          <p className="mt-4 text-gray-300">{data.overview}</p>
          {credits && (
            <>
              <CrewInfo crew={credits.crew} />
              <CastList cast={credits.cast} />
            </>
          )}
          <div className="mt-4 flex gap-4">
            <span>⭐ {data.vote_average.toFixed(1)}</span>
            <span>Popularity {data.popularity}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
