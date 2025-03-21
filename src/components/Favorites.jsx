// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useFavorites from "./useFavorites";

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="h-screen w-screen bg-neutral-900 text-white flex justify-center items-center">
      {favorites.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-lg mt-8 p-4 bg-gray-200 rounded-2xl shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Favorites
          </h3>
          {favorites.map((fav, index) => (
            <div
              key={index}
              className="border-b last:border-none py-2 flex justify-between items-center"
            >
              <div>
                <p className="text-gray-700">"{fav.content}"</p>
                <span className="text-sm text-gray-500">- {fav.author}</span>
              </div>
              <button
                onClick={() => toggleFavorite(fav)}
                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Favorites;
