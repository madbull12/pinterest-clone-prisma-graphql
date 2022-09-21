import { useQuery } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import { MdArrowDropDown } from "react-icons/md";
import { firstBoardQuery, UserIdQuery } from "../lib/query";
import BoardDropdown from "./BoardDropdown";

const EditModal = () => {
  const { user } = useUser();
  const { data: userId } = useQuery(UserIdQuery, {
    variables: {
      userId: user?.email,
    },
  });
  const { data: firstBoard } = useQuery(firstBoardQuery, {
    variables: {
      userId: userId?.user.id,
    },
  });

  console.log(firstBoard);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4">
      <h1 className="text-center font-semibold text-2xl">Edit this Pin</h1>
      <form className="flex gap-x-4 w-full mt-8">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <label className="flex-[0.25]">Board</label>
            <div className="flex justify-between  items-center bg-gray-300 px-4 py-2 rounded-lg flex-[0.75]">
              <p className="font-semibold">{firstBoard?.firstUserBoard.name}</p>
              <MdArrowDropDown />

            </div>
            {/* <BoardDropdown /> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
