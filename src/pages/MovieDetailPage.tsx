import { Helmet } from "react-helmet-async";
import type { Movie } from "../types/movie";

interface Props {
  movie: Movie;
}

export default function MovieDetailPage({ movie }: Props) {
  return (
    <>
      <Helmet>
        <title>{movie.title} | Movie App</title>
        <meta name="description" content={movie.overview} />
      </Helmet>
    </>
  );
}
