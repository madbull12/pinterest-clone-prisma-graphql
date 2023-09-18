import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import { MdLock } from "react-icons/md";
import { BoardPins } from "../../lib/query";
import { v4 as uuidv4 } from "uuid";
import Pin from "../../components/Pin";
import MasonryWrapper from "../../components/MasonryWrapper";
import Loading from "../../components/Loading";
import { AiFillEdit } from "react-icons/ai";
import Container from "../../components/Container";
import { useRecoilState } from "recoil";
import { boardEditModal } from "../../atom/boardAtom";
import { PinWithPayload, SavedWithPayload } from "../../interface";
import { trpc } from "../../utils/trpc";

const BoardDetails = () => {
  const router = useRouter();

  const {
    data: boardPins,
    isLoading,
    error,
  } = trpc.board.boardPins.useQuery({
    boardId:router?.query?.boardId as string
  })
  const [_, setEditBoard] = useRecoilState<any>(boardEditModal);

  console.log(boardPins);
  if (isLoading) return <Loading />;
  if (error)
    return <p className="text-center text-xl font-bold">{error?.message}</p>;

  return (
    <Container>
      <div className="flex gap-y-4 items-center flex-col">
        <h1 className="text-center text-3xl font-semibold">
          {boardPins?.name}
        </h1>
        <div
          onClick={() => {
            window.scrollTo({ top: 0 });
            setEditBoard(true);
          }}
          className="rounded-full bg-gray-300 h-10 w-10 grid place-items-center cursor-pointer"
        >
          <AiFillEdit />
        </div>
        {boardPins?.secret && (
          <div className="flex justify-center items-center gap-x-2 text-gray-400">
            <MdLock className="text-center" />
            <p>Secret board</p>
          </div>
        )}
        <p>{boardPins?.description}</p>
        <div className="self-start w-full">
          <p className="text-xl font-semibold px-4">
            {boardPins?.saved.length} pins
          </p>
          <MasonryWrapper>
            {boardPins?.saved.map((item) => (
              <Pin key={uuidv4()} item={item.pin as PinWithPayload} />
            ))}
          </MasonryWrapper>
        </div>
      </div>
    </Container>
  );
};

export default BoardDetails;
