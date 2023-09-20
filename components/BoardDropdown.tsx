import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import Loading from "./Loading";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { UseFormRegister } from "react-hook-form";

interface IFormInput {
  title: string;
  description: string;
  boardId?:string;
}

const BoardDropdown = ({ register }:{ register:UseFormRegister<IFormInput>}) => {
  const { data: session } = useSession();

  // const { data: firstBoard, loading } = useQuery(firstBoardQuery, {
  //   variables: {
  //     userId: session?.user?.id,
  //   },
  // });

  const { data: boards, isLoading } = trpc.board.getYourBoards.useQuery();
  if (isLoading) return <Loading />;

  return (

    <Select {...register("boardId")}  defaultValue={boards?.[0].id}  items={boards} placeholder="Select a board" className="w-full">
      {(board) => (
        <SelectItem key={crypto.randomUUID()} value={board?.id} className="capitalize">
          {board?.name}
        </SelectItem>
      )}
    </Select>
  );
};

export default BoardDropdown;
