import { useQuery } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import React, { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { firstBoardQuery } from "../lib/query";
import BoardList from "./BoardList";
import Loading from "./Loading";
import { useSession } from 'next-auth/react'

const BoardDropdown = () => {
  const { data:session }:any = useSession();

  const { data: firstBoard, loading } = useQuery(firstBoardQuery, {
    variables: {
      userId: session?.user.id,
    },
  });
  const [openDropdown, setOpenDropdown] = useState(false);
  if (loading) return <Loading />;

  return (
    <div className="w-full flex flex-col">

        <div
          onClick={() => setOpenDropdown(!openDropdown)}
          className="flex relative justify-between items-center cursor-pointer  bg-gray-300 px-4 py-2 rounded-lg flex-[0.75]"
        >
          <p className="font-semibold">{firstBoard?.firstUserBoard.name}</p>
          <MdArrowDropDown />
        </div>
        {openDropdown && (
          <div className=" w-full ">
            <BoardList />
          </div>
        )}
    </div>
 
  );
};

export default BoardDropdown;
