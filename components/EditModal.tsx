import { useQuery } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import React,{ useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { firstBoardQuery, UserIdQuery } from "../lib/query";
import BoardDropdown from "./BoardDropdown";
import BoardList from "./BoardList";
import Loading from "./Loading";

const EditModal = () => {



  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4" onClick={(e)=>e.stopPropagation()}>
   
          <h1 className="text-center font-semibold text-2xl">Edit this Pin</h1>
          <form className="flex gap-x-4 w-full mt-8">
            <div className="w-full">
              <div className="flex items-center justify-between">
                <label className="flex-[0.25]">Board</label>
                <BoardDropdown />
              </div>
            </div>
          </form>
        

      
    </div>
  );
};

export default EditModal;
