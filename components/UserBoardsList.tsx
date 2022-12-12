import React from "react";
import { v4 } from "uuid";
import { IBoard } from "../interface";
import UserBoard from "./UserBoard";

interface IProps {
  userBoards: IBoard[];
}
const UserBoardsList = ({ userBoards }: IProps) => {
  return (
    <div className="flex flex-wrap items-center p-4 gap-4  justify-center md:justify-start">
      {userBoards?.length !== 0 ? (
        <>
          {userBoards?.map((board: IBoard) => (
            <UserBoard board={board}  key={v4()}/>
          ))}
        </>
      ) : (
        <h1 className="text-xl  font-semibold">No pins saved yet</h1>
      )}
    </div>
  );
};

export default UserBoardsList;
