import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const CategoryTag = ({ category }: { category: string }) => {
  return (
    <div
      className="bg-gray-400 cursor-pointer relative rounded-full px-2 py-1 text-white "
    >
      <span>{category}</span>
      <AiFillCloseCircle className="absolute -top-1 z-50 -right-1 text-gray-500" />
    </div>
  );
};

export default CategoryTag;
