// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useFavorites from "./useFavorites";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { TiDeleteOutline } from "react-icons/ti";
import { LuSquareArrowOutUpRight } from "react-icons/lu";

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();

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
            {favorites.map((fav, index) => (
              <div
                key={index}
                className="bg-neutral-900 rounded-md p-2 gap-2 flex justify-between items-start"
              >
                <div>
                  <p className="text-gray-200 mb-1">"{fav.content}"</p>
                  <a
                    href={`https://en.wikipedia.org/wiki/${fav.author}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 flex items-center gap-1.5 cursor-pointer"
                  >
                    - {fav.author} <LuSquareArrowOutUpRight size={13} />
                  </a>
                </div>
                <button
                  onClick={() => toggleFavorite(fav)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:scale-105 transition text-sm cursor-pointer hidden sm:block"
                >
                  Remove
                </button>
                <button
                  onClick={() => toggleFavorite(fav)}
                  className="hover:scale-110 transition cursor-pointer sm:hidden"
                >
                  <TiDeleteOutline
                    size={20}
                    className="text-red-500  rounded-full"
                  />
                </button>
              </div>
            ))}
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
