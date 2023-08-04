import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiFillLock } from "react-icons/ai";
import savePin from "../helper/savePin";
import { BoardWithPayload } from "../interface";
import { UserBoardsQuery } from "../lib/query";
import Button from "./Button";
import { useSession } from "next-auth/react";
import { v4 } from "uuid";

interface IBoardItem {
  board: BoardWithPayload;
  edit?: boolean;
}
const BoardItem = ({ board, edit }: IBoardItem) => {
  const [showSaveBtn, setShowSaveBtn] = useState<boolean>(false);
  const router = useRouter();
  const { data: session }: any = useSession();

  const { pinId } = router.query;
  console.log(board);
  return (
    <div
      className="flex items-center justify-between hover:bg-gray-100 rounded-lg p-1"
      onMouseEnter={() => setShowSaveBtn(true)}
      onMouseLeave={() => setShowSaveBtn(false)}
    >
      <div className="flex items-center gap-x-2">
        {!edit && <div className="bg-gray-300 w-12 h-12 rounded-lg"></div>}
        <p className="font-semibold">{board.name}</p>
      </div>

      {!edit ? (
        <>{!showSaveBtn && <>{board.secret && <AiFillLock />}</>}</>
      ) : (
        <>{board.secret && <AiFillLock />}</>
      )}

      {!edit && (
        <Button
          text="Save"
          handleClick={() => {
            savePin(session?.user?.id, board.id, pinId);
          }}
        />
      )}
    </div>
  );
};

const BoardList = () => {
  const { data: session }: any = useSession();

  const { data: userBoards } = useQuery(UserBoardsQuery, {
    variables: {
      userId: session?.user?.id,
    },
  });

  console.log(userBoards?.userBoards);
  return (
    <div className="p-2 rounded-lg border-gray-200 border bg-white ">
      {userBoards?.userBoards.map((board: BoardWithPayload) => (
        <BoardItem board={board} edit={true} key={v4()} />
      ))}
    </div>
  );
};

export default BoardList;
