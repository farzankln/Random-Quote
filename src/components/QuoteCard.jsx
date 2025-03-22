import useFavorites from "./useFavorites";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Loader from "./Loader";

const QuoteCard = ({ quote, author, loading }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.content === quote);

  return (
    <div
      className={`bg-neutral-900 shadow-lg rounded-lg p-4 mx-auto w-full h-full flex flex-col space-y-4 
        ${loading ? "justify-center" : "justify-between"}`}
    >
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <Loader />
        </div>
      ) : (
        <>
          <div className="h-full flex items-center justify-center text-center">
            {quote ? (
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-200 max-h-56 overflow-y-auto scrollbar-hidden">
                "{quote}"
              </p>
            ) : (
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-400 max-h-56 overflow-y-auto scrollbar-hidden">
                No quote available, please try again.
              </p>
            )}
          </div>
          <div className="flex justify-between items-center text-xs md:text-base">
            <a
              href={quote ? `https://en.wikipedia.org/wiki/${author}` : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-400 flex justify-center items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 
                ${!quote && "opacity-50 cursor-not-allowed"}`}
            >
              - {author || "Unknown"}
              <LuSquareArrowOutUpRight size={13} />
            </a>
            <button
              onClick={() =>
                quote && toggleFavorite({ content: quote, author })
              }
              className="transition-transform hover:scale-110 active:scale-95 rounded-full cursor-pointer"
              disabled={!quote}
            >
              {isFavorite ? (
                <FaHeart size={20} className="text-red-500" />
              ) : (
                <FaRegHeart
                  size={20}
                  className={`text-gray-500 ${
                    quote
                      ? "hover:text-red-500"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                />
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuoteCard;
