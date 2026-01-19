import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import type { Movie } from "../types/movie";
import { imageUrl } from "../lib/api";

interface MovieCardProps {
  movie: Movie;
  index: number;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();

  const handleParallax = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const img = imgRef.current;
    if (!img) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width - 0.5) * 20;

    img.style.transform = `translateX(${percent}px) scale(1.1)`;
  };

  const resetParallax = () => {
    if (imgRef.current) {
      imgRef.current.style.transform = "translateX(0px) scale(1)";
    }
  };

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="
        w-45 h-65
        shrink-0
        rounded-xl overflow-hidden
        bg-gray-800
        cursor-pointer
        group
      "
      onMouseMove={handleParallax}
      onMouseLeave={resetParallax}
    >
      <img
        ref={imgRef}
        src={`${imageUrl}${movie.poster_path}`}
        alt={movie.title}
        className="
          w-full h-full object-cover
          transition-transform duration-300 ease-out
        "
      />
    </div>
  );
}
