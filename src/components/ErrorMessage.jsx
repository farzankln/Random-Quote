const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="text-gray-200 font-medium text-lg space-y-4">
      <div>{message}</div>
      <button
        onClick={onRetry ? onRetry : () => window.location.reload()}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Refresh
      </button>
    </div>
  );
};

export default ErrorMessage;
