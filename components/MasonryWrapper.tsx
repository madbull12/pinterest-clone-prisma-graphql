import React from "react";
import Masonry from "react-masonry-css";

const MasonryWrapper = ({ children }: { children:React.ReactNode}) => {
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        375: 1
      };
  return (
    <div className="relative">
      <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
      >
        {children}

      
      </Masonry>
    </div>

  )
};

export default MasonryWrapper;
