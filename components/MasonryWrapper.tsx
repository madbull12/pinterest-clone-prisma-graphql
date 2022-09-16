import React from "react";
import Masonry from "react-masonry-css";

const MasonryWrapper = ({ children }: { children:React.ReactNode}) => {
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
      };
  return (
    <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
    >
        {children}
    </Masonry>
  )
};

export default MasonryWrapper;
