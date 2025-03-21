import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import QuoteCard from "./QuoteCard";
import useFetchQuote from "./useFetchQuote";
import useFavorites from "./useFavorites";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom"; // import Link from react-router-dom

const RandomQuote = () => {
  const { quote, loading, error, fetchRandomQuote } = useFetchQuote();
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-lg text-center">
          <QuoteCard quote={quote.content} author={quote.author} />
          <div className="mt-4 flex gap-2 justify-center">
            <button
              onClick={fetchRandomQuote}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              New Quote
            </button>
            <button
              onClick={() => toggleFavorite(quote)}
              className={`px-4 py-2 ${
                favorites.some((fav) => fav.content === quote.content)
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              } text-white rounded-md transition`}
            >
              {favorites.some((fav) => fav.content === quote.content)
                ? "Remove from Favorites"
                : "Save to Favorites"}
            </button>
            <Link
              to="/favorites"
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition cursor-pointer"
            >
              <FaRegHeart />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomQuote;
