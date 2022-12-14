import { IBoard } from "../interface";
import { useState } from "react";
import BoardSaveItem from "./BoardSaveItem";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
const SaveDialog = ({ userBoards }: { userBoards: IBoard[] }) => {
  console.log(userBoards);
  const [filter, setFilter] = useState<string>("");

  return (
    <div className="bg-white p-4 shadow-md rounded-xl space-y-3">
      <p className="text-center font-semibold">Save to board</p>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setFilter(e.target.value)}
        className="px-4 py-2 border-2 outline-none rounded-full border-gray-300 w-full focus:ring-4 ring-blue-300 "
      />
      <div>
        <p className="text-xs text-start px-2">All boards</p>
        <div className="flex flex-col gap-y-2 mt-2">
          {userBoards?.length === 0 ? (
            <>
              <h1 className="text-sm md:text-base">
                No boards.{" "}
                <Link href="/user/saved">
                  <span className="underline text-xs md:text-sm">Create here</span>
                </Link>
              </h1>
            </>
          ) : (
            <>
              {userBoards
                ?.filter((board: IBoard) => board.name.toLowerCase().includes(filter.toLowerCase()))
                .map((board: IBoard) => (
                  <BoardSaveItem key={uuidv4()} board={board} />

                  // <div
                  //   key={uuidv4()}
                  //   className="flex items-center justify-between hover:bg-gray-100 rounded-lg p-1"
                  // >
                  //   <div className="flex items-center gap-x-2">
                  //     <div className="bg-gray-300 w-12 h-12 rounded-lg"></div>
                  //     <p className="font-semibold">{board.name}</p>
                  //   </div>
                  //   {board.secret && (
                  //     <AiFillLock className="text-lg" />

                  //   )}
                  //   <Button text={"Save"} handleClick={()=>{}} />
                  // </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SaveDialog;
