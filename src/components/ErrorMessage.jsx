const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="text-red-500 font-bold text-lg flex flex-col items-center gap-2">
      <div>{message}</div>
      <button
        onClick={onRetry ? onRetry : () => window.location.reload()}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Refresh
      </button>
    </div>
  );
};

export default ErrorMessage;
