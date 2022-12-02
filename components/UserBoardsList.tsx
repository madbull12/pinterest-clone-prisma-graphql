import React from "react";
import { IBoard } from "../interface";
import UserBoard from "./UserBoard";

interface IProps {
  userBoards: IBoard[];
}
const UserBoardsList = ({ userBoards }: IProps) => {
  return (
    <div className=" grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
      {userBoards?.length !== 0 ? (
        <>
          {userBoards?.map((board: IBoard) => (
            <UserBoard board={board} />
          ))}
        </>
      ) : (
        <h1 className="text-xl  font-semibold">No pins saved yet</h1>
      )}
    </div>
  );
};

export default UserBoardsList;
