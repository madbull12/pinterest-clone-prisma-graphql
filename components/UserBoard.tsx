import Link from "next/link";
import React from "react";
import { IBoard } from "../interface";
import { ReactPhotoCollage } from "react-photo-collage";
import { FiLock } from "react-icons/fi";

const UserBoard = ({ board }: { board: IBoard }) => {
  console.log(board);
  const setting = {
    width: "250px",

    height: ["150px", "100px"],
    layout: [1,3],
    photos: board.saved.map((item) => {
      return {
        source: item.pin.media,
      };
    }),
    showNumOfRemainingPhotos: true,
  };
  return (
    <Link href={`/board/${board.id}`}>
      <div className="cursor-pointer relative space-y-2 ">
        <div>
          <ReactPhotoCollage {...setting} />

        </div>
        <p className="font-bold">{board.name}</p>
        <p>
          {board.saved.length} pins 
        </p>
        {board.secret ? <FiLock className="absolute top-0 left-2 text-white text-2xl" /> : null}
      </div>
    </Link>
  );
};

export default UserBoard;
