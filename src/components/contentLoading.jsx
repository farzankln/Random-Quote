import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ContentLoading = () => {
  return (
    <div className="w-full">
      <Skeleton
        className="w-full h-5 bg-[#aaa]/25"
        count={4}
        baseColor="#8881"
        highlightColor="#8882"
      />
    </div>
  );
};

export default ContentLoading;
