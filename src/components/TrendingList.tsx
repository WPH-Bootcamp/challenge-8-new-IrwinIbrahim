import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface TrendingListProps {
  movies: Movie[];
}

export default function TrendingList({ movies }: TrendingListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pause, setPause] = useState(false);

  const scrollAmount = 260; // width card + gap

  const scrollLeft = () => {
    containerRef.current?.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const container = containerRef.current;
    if (!container) return;

    if (
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - 5
    ) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!containerRef.current || pause) return;

    const interval = setInterval(() => {
      scrollRight();
    }, 3500);

    return () => clearInterval(interval);
  }, [pause]);

  return (
    <section className="relative px-4 mt-8 group">
      <h2 className="text-xl font-bold mb-3">Trending Now</h2>

      {/* Left arrow */}
      <button
        onClick={scrollLeft}
        className="
          absolute left-2 top-1/2 -translate-y-1/2 z-10
          hidden group-hover:flex
          items-center justify-center
          w-10 h-10 rounded-full
          bg-black/60 text-white
          hover:bg-black/80
        "
      >
        <ChevronLeft />
      </button>

      {/* Right arrow */}
      <button
        onClick={scrollRight}
        className="
          absolute right-2 top-1/2 -translate-y-1/2 z-10
          hidden group-hover:flex
          items-center justify-center
          w-10 h-10 rounded-full
          bg-black/60 text-white
          hover:bg-black/80
        "
      >
        <ChevronRight />
      </button>

      {/* Movie list */}
      <div
        ref={containerRef}
        className="
          flex gap-4
          overflow-x-auto
          scrollbar-hide
          py-2
          scroll-smooth
        "
        onMouseEnter={() => setPause(true)}
        onMouseLeave={() => setPause(false)}
      >
        {movies.map((movie, i) => (
          <MovieCard key={movie.id} movie={movie} index={i} />
        ))}
      </div>
    </section>
  );
}
