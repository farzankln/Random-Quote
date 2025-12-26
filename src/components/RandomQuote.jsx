import ErrorMessage from "./ErrorMessage";
import QuoteCard from "./QuoteCard";
import useFetchQuote from "./useFetchQuote";
import { Link } from "react-router-dom";

const RandomQuote = () => {
  const { quote, loading, error, fetchRandomQuote } = useFetchQuote();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-neutral-900 p-4">
      {error && <ErrorMessage message={error} onRetry={fetchRandomQuote} />}
      {!error && (
        <div className="w-full max-w-lg sm:h-96 h-8/12 p-4 bg-neutral-500/25 rounded-2xl shadow-lg text-center flex flex-col gap-4">
          <QuoteCard
            quote={quote.content}
            author={quote.author}
            loading={loading}
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
            <button
              onClick={fetchRandomQuote}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition cursor-pointer text-sm md:text-base"
              disabled={loading}
            >
              New Quote
            </button>

            <Link
              to="/favorites"
              className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition cursor-pointer text-sm md:text-base "
            >
              Favorites
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomQuote;
