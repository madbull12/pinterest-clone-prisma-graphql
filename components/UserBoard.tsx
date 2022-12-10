import Link from "next/link";
import React from "react";
import { IBoard } from "../interface";

const UserBoard = ({ board }: { board: IBoard }) => {
  console.log(board)
  return (
    <Link href={`saved/${board.id}`}>
      <div className="bg-gray-400 hover:-translate-y-2 duration-100 ease-in hover:shadow-md cursor-pointer   h-32  rounded-lg grid place-items-center text-white font-bold">
        <p>{board.name}</p>
      </div>
    </Link>
  );
};

export default UserBoard;
