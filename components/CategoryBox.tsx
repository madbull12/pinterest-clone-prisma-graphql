import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { CategoryWithPins } from "../interface";

const CategoryBox = ({ category }: { category: CategoryWithPins }) => {
  const router = useRouter()
  return (
    <div onClick={()=>router.push(`/search?q=${category.name}`)} className="rounded-lg cursor-pointer">
      {category.pins.length !== 0 ? (
        <div className="relative   w-full h-44 grid place-items-center">
          <Image
            src={category.pins[0].media}
            layout="fill"
            objectFit="cover"
            className="rounded-3xl"
          />
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#03030383] rounded-3xl"></div>
          <p className="text-white absolute font-semibold capitalize">{category.name}</p>
        </div>
      ) : null}
    </div>
  );
};

export default CategoryBox;
