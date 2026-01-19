import Navbar from "../components/Navbar";
import FavoritesList from "../components/FavoritesList";
import { useFavorites } from "../hooks/useFavorites";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Navbar */}
      <Navbar onSearch={() => {}} />

      <main className="pt-16 px-6">
        <h1 className="text-2xl font-bold mb-6">My Favorites</h1>

        {/* State : Empty */}
        {favorites.length === 0 && (
          <div className="text-gray-400 mt-6">
            You don’t have any favorite movies yet.
          </div>
        )}

        {/* State : List */}
        {favorites.length > 0 && <FavoritesList movies={favorites} />}
      </main>
    </div>
  );
}
