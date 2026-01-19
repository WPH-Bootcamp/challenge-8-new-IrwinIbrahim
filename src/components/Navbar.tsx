import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const { favorites } = useFavorites();

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div
        className={`border-b border-white/10 transition-colors duration-300
          ${openMenu ? "bg-black" : "backdrop-blur-md bg-black/40"}
        `}
      >
        <div className="flex items-center justify-between px-5 py-4 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center">
            <img
              src="/src/assets/Logo.svg"
              alt="Movie Logo"
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-8 text-gray-300 text-sm relative">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <Link to="/favorites" className="hover:text-white relative">
              Favorites
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>

          <div className="hidden md:block w-72">
            <SearchBar onSearch={onSearch} />
          </div>

          {openSearch && (
            <div className="md:hidden fixed top-20 left-40 w-full px-4 z-60">
              <SearchBar onSearch={onSearch} />
            </div>
          )}

          {/* Mobile action */}
          <div className="flex items-center gap-4 text-white md:hidden">
            <button
              onClick={() => {
                setOpenSearch(!openSearch);
                setOpenMenu(false);
              }}
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                setOpenMenu(!openMenu);
                setOpenSearch(false);
              }}
            >
              {openMenu ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Full black dropdown */}
      <div
        className={`md:hidden fixed top-15 left-0 w-full bg-black transition-all duration-300
          ${openMenu ? "h-screen opacity-100" : "h-0 opacity-0 pointer-events-none"}
        `}
      >
        <div className="flex flex-col px-6 pt-10 gap-6 text-lg text-gray-200">
          <Link
            to="/"
            onClick={() => setOpenMenu(false)}
            className="hover:text-white"
          >
            Home
          </Link>

          <Link
            to="/favorites"
            onClick={() => setOpenMenu(false)}
            className="hover:text-white relative"
          >
            Favorites
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-16 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {favorites.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
