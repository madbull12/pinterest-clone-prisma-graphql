import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useMemo, useState } from "react";
import { IPin } from "../interface";

interface IProps {
  item: IPin;
  isEdit?: boolean;
}
const Pin = ({ item, isEdit }: IProps) => {
  // const [width,setWidth] = useState<number>();
  // const [height,setHeight] = useState<number>();

  const widthGenerator = useMemo(() => {
    return Math.floor(Math.random() * (450 - 300 + 1) + 300);

  },[])
 
  const heightGenerator = useMemo(()=>{
    return Math.floor(Math.random() * (450 - 300 + 1) + 300);

  },[]) 

  // const aspectGenerator = () => {
  //   const aspects = ["aspect-square", "aspect-video"];

  //   return aspects[Math.floor(Math.random() * aspects.length)];
  // };
  return (
    <div key={item.userId} className="relative  my-3">
      <Link href={`/pin/${item?.id}`}>
        <span className="cursor-pointer flex flex-col">
          {item.media.includes(".mp4") ? (
            <video controls className="relative h-full w-full rounded-2xl">
              <source src={item?.media} type="video/mp4"></source>
            </video>
          ) : (
            <>
              <Image
                src={item?.media}
                width={widthGenerator}
                height={heightGenerator}
                objectFit="cover"
                className="rounded-2xl"

              />


            </>
          )}
        {!isEdit && <h1 className="font-semibold">{item.title}</h1>}

        </span>

      </Link>
    </div>
  );
};

export default Pin;
