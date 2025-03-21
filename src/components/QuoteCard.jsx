const QuoteCard = ({ quote, author, onNewQuote }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
      <p className="text-lg font-semibold text-gray-800">"{quote}"</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-gray-600">- {author}</span>
        <a
          href={`https://en.wikipedia.org/wiki/${author}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Wiki
        </a>
      </div>
      <button
        onClick={onNewQuote}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        New Quote
      </button>
    </div>
  );
};

export default QuoteCard;
