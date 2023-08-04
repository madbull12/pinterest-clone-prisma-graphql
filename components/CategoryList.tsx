import React from "react";
import { v4 } from "uuid";
import { CategoryWithPins } from "../interface";
import CategoryBox from "./CategoryBox";

const CategoryList = ({ categories }: { categories: CategoryWithPins[] }) => {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 min-[500px]:grid-cols-3 md:grid-cols-4 gap-4 ">
      {categories
        ?.filter((category: CategoryWithPins) => category.pins.length !== 0)
        .map((category: CategoryWithPins) => (
          <CategoryBox key={v4()} category={category} />
        ))}
    </div>
  );
};

export default CategoryList;
