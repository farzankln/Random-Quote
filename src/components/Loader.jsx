const Loader = ({ size = "normal" }) => {
  const sizeClasses = {
    small: "size-4 border-2",
    normal: "size-8 border-4",
  };

  return (
    <div
      className={`animate-spin rounded-md border-white ${
        sizeClasses[size] || sizeClasses.normal
      }`}
    ></div>
  );
};

export default Loader;
