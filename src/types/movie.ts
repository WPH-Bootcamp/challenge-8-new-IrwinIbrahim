// Tipe utama (Semua komponen UI wajib pakai ini)

export type Movie = {
  id: number;

  title: string;
  original_title: string;

  overview: string;

  poster_path: string | null;
  backdrop_path: string | null;

  release_date: string;
  vote_average: number;
  vote_count: number;

  popularity: number;

  // Optional (Khusus detail)
  runtime?: number;
  genres?: { id: number; name: string }[];
  trailer_url?: string;
  production_companies?: {
    id: number;
    name: string;
    logo_path: string | null;
  }[];
  production_countries?: { iso_3166_1: string; name: string }[];
  spoken_languages?: { iso_639_1: string; name: string }[];

  // Local state (Bukan dari API)
  is_favorite?: boolean;
};

// Tipe raw dari TMDB API
export type TrendingMovie = {
  id: number;

  title: string;
  original_title?: string;
  overview?: string;

  poster_path: string | null;
  backdrop_path: string | null;

  release_date?: string;
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
};

export type SearchMovie = {
  id: number;
  title: string;
  original_title?: string;
  overview?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
};

export type MovieDetail = {
  id: number;
  title: string;
  original_title: string;
  overview: string;

  poster_path: string | null;
  backdrop_path: string | null;

  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;

  runtime: number;
  genres: { id: number; name: string }[];

  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  spoken_languages: { iso_639_1: string; name: string }[];
};

export type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type Crew = {
  id: number;
  name: string;
  job: string;
  department: string;
};

export type Video = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
};

// Tipe untuk Favorites (Local storage / state)
export type FavoriteMovie = Movie & {
  added_at: string;
};
