import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import FavoritesPage from "./pages/FavoritesPage";
import { FavoritesProvider } from "./context/FavoritesProvider";

export default function App() {
  return (
    <FavoritesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </FavoritesProvider>
  );
}