import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { useRecoilState } from "recoil";
import { editModalState } from "../atom/editAtom";


const HoverEdit = () => {
  const [openEditModal, setEditModal] = useRecoilState(editModalState);

  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className=" absolute z-50  h-full w-full rounded-lg "
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover && (
        <div className="w-full h-[98%] bg-black opacity-50 rounded-2xl">
          <div className="bg-white opacity-1 absolute right-0 mx-auto bottom-4 left-0 w-8 h-8 rounded-full text-black grid place-items-center">
            <MdEdit onClick={()=>{
              window.scrollTo(0,0)
              setEditModal(true)
            }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HoverEdit;
