import { X } from "lucide-react";
import { useMovieTrailer } from "../hooks/useMovieTrailer";

interface TrailerModalProps {
  movieId: number;
  onClose: () => void;
}

export default function TrailerModal({ movieId, onClose }: TrailerModalProps) {
  const { data } = useMovieTrailer(movieId);

  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white"
      >
        <X size={28} />
      </button>

      <iframe
        className="w-[90%] max-w-4xl aspect-video rounded-lg"
        src={`https://www.youtube.com/embed/${data.key}`}
        allowFullScreen
      />
    </div>
  );
}
