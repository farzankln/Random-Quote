import useFavorites from "./useFavorites";
import useTranslate from "../hooks/useTranslate";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import Loader from "./Loader";
import { useEffect } from "react";

const QuoteCard = ({ quote, author, loading }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const {
    translation,
    isTranslating,
    translationError,
    isTranslationEnabled,
    isContentReady,
    clearTranslation,
    toggleTranslation,
    autoTranslateIfEnabled,
    shouldShowContent,
  } = useTranslate();
  const isFavorite = favorites.some((fav) => fav.content === quote);

  useEffect(() => {
    if (!quote && (translation.quote || translation.author)) {
      clearTranslation();
    }
  }, [quote, translation, clearTranslation]);

  useEffect(() => {
    if (quote && !loading && isTranslationEnabled) {
      autoTranslateIfEnabled(quote, author);
    }
  }, [quote, author, loading, isTranslationEnabled, autoTranslateIfEnabled]);

  const showContent = shouldShowContent();
  const showLoader = loading || (isTranslationEnabled && !isContentReady);

  const handleTranslate = () => {
    if (quote || author) {
      toggleTranslation(quote, author);
    }
  };

  return (
    <div
      className={`bg-neutral-900 shadow-lg rounded-lg p-4 mx-auto w-full h-full flex flex-col space-y-4 
        ${showLoader ? "justify-center" : "justify-between"}`}
    >
      {showLoader ? (
        <div className="flex justify-center items-center h-20">
          <Loader />
        </div>
      ) : (
        <>
          <div className="h-full flex items-center justify-center text-center">
            {showContent ? (
              <div className="space-y-2">
                <p
                  className={`text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-200 max-h-56 overflow-y-auto scrollbar-hidden ${
                    translation.quote ? "persian-text" : ""
                  }`}
                >
                  "{translation.quote || quote}"
                </p>
                {translationError && (
                  <p className="text-red-400 text-xs">{translationError}</p>
                )}
              </div>
            ) : quote ? (
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
              href={
                quote
                  ? translation.author
                    ? `https://fa.wikipedia.org/wiki/${encodeURIComponent(
                        translation.author
                      )}`
                    : `https://en.wikipedia.org/wiki/${encodeURIComponent(
                        author
                      )}`
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-400 flex justify-center items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 
                ${!quote && "opacity-50 cursor-not-allowed"}`}
            >
              - {translation.author || author || "Unknown"}
              <LuSquareArrowOutUpRight size={13} />
            </a>
            <div className="flex items-center gap-2">
              <button
                onClick={handleTranslate}
                className={`transition-transform hover:scale-110 active:scale-95 rounded-full cursor-pointer p-1
                  ${
                    !quote
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-500/20"
                  }`}
                disabled={!quote || showLoader}
                title={
                  translation.quote || translation.author
                    ? "Clear translation"
                    : "Translate to Persian"
                }
              >
                {isTranslating ? (
                  <Loader size="small" />
                ) : (
                  <IoLanguage
                    size={20}
                    className={`${
                      translation.quote || translation.author
                        ? "text-blue-500"
                        : "text-gray-500"
                    }`}
                  />
                )}
              </button>
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
          </div>
        </>
      )}
    </div>
  );
};

export default QuoteCard;
