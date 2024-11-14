import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const authorLoading = () => {
  return (
    <div className="">
      <Skeleton
        className="w-24 h-5 bg-[#aaa]/25"
        baseColor="#8881"
        highlightColor="#8882"
      />
    </div>
  );
};

export default authorLoading;
