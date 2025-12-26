import useFavorites from "./useFavorites";
import useFavoriteTranslations from "../hooks/useFavoriteTranslations";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { TiDeleteOutline } from "react-icons/ti";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { IoLanguage } from "react-icons/io5";
import Loader from "./Loader";

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const {
    toggleFavoriteTranslation,
    getFavoriteTranslation,
    isFavoriteTranslating,
    getFavoriteTranslationError,
    hasFavoriteTranslation,
  } = useFavoriteTranslations();

  return (
    <div className="h-screen w-screen bg-neutral-900 flex justify-center items-center p-4 md:py-12 sm:py-8 ">
      <div className="relative h-full w-full lg:max-w-3xl md:max-w-2xl sm:max-w-xl bg-neutral-500/25 rounded-2xl shadow-md overflow-y-auto">
        <nav className=" font-semibold text-white bg-neutral-700 px-4 py-2 sticky top-0 z-10 shadow-lg flex justify-between items-center rounded-md">
          <h3 className="text-lg ">Favorites</h3>
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
          >
            <HiOutlineArrowLeft size={20} />
          </Link>
        </nav>

        {favorites.length > 0 ? (
          <div className="m-3 space-y-3">
            {favorites.map((fav, index) => {
              const favoriteId = `${fav.content}-${fav.author}`;
              const translation = getFavoriteTranslation(favoriteId);
              const isTranslating = isFavoriteTranslating(favoriteId);
              const translationError = getFavoriteTranslationError(favoriteId);
              const hasTranslation = hasFavoriteTranslation(favoriteId);

              const handleTranslate = () => {
                toggleFavoriteTranslation(favoriteId, fav.content, fav.author);
              };

              return (
                <div key={index} className="bg-neutral-900 rounded-md p-2 pb-1">
                  <div>
                    <p
                      className={`text-gray-200 pb-2 text-center ${
                        translation.quote ? "persian-text" : ""
                      }`}
                    >
                      "{translation.quote || fav.content}"
                    </p>
                    {translationError && (
                      <p className="text-red-400 text-xs mb-1">
                        {translationError}
                      </p>
                    )}
                  </div>

                  <div className=" gap-2 flex justify-between items-center">
                    <a
                      href={
                        translation.author
                          ? `https://fa.wikipedia.org/wiki/${encodeURIComponent(
                              translation.author
                            )}`
                          : `https://en.wikipedia.org/wiki/${encodeURIComponent(
                              fav.author
                            )}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      - {translation.author || fav.author}{" "}
                      <LuSquareArrowOutUpRight size={13} />
                    </a>
                    <div>
                      <button
                        onClick={handleTranslate}
                        className="transition-transform hover:scale-110 active:scale-95 rounded-full cursor-pointer p-1 hover:bg-blue-500/20"
                        disabled={isTranslating}
                        title={
                          hasTranslation
                            ? "Clear translation"
                            : "Translate to Persian"
                        }
                      >
                        {isTranslating ? (
                          <Loader size="small" />
                        ) : (
                          <IoLanguage
                            size={20}
                            className={
                              hasTranslation ? "text-blue-500" : "text-gray-500"
                            }
                          />
                        )}
                      </button>
                      <button
                        title="Remove"
                        onClick={() => toggleFavorite(fav)}
                        className="transition-transform hover:scale-110 active:scale-95 rounded-full cursor-pointer p-1 hover:bg-red-500/20"
                      >
                        <TiDeleteOutline
                          size={22}
                          className="text-red-500 rounded-full"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <p className="text-gray-200 text-center md:text-lg">
              No favorite quotes yet.{" "}
              <Link to="/" className="text-blue-400 hover:underline">
                Add some!
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
