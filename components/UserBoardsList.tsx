import React from "react";
import { IBoard } from "../interface";
import UserBoard from "./UserBoard";

interface IProps {
  userBoards: IBoard[];
}
const UserBoardsList = ({ userBoards }: IProps) => {
  return (
    <>
      {userBoards?.length !== 0 ? (
        <>
          {userBoards?.map((board: IBoard) => (
            <UserBoard board={board} />
          ))}
        </>
      ) : (
        <h1 className="text-xl  font-semibold">No pins saved yet</h1>
      )}
    </>
  );
};

export default UserBoardsList;
