import Link from "next/link";
import React, { useState, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { useRecoilState } from "recoil";
import { boardModalState } from "../atom/boardAtom";
import useOutsideClick from "../hooks/useOutsideClick";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";

const CreateDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const [_, setOpenModal] = useRecoilState(boardModalState);
  useOutsideClick(dialogRef, () => {
    setDialogOpen(false);
  });
  return (
    // <div className="relative ">
    //       <div
    //         className="hover:bg-gray-200 z-50 w-10 h-10 grid  place-items-center rounded-full "
    //         onClick={() => setDialogOpen(!dialogOpen)}
    //       >
    //         <FiPlus
    //           className="text-2xl text-end cursor-pointer"
    //           onClick={() => setDialogOpen(!dialogOpen)}
    //         />
    //       </div>
    //       {dialogOpen && (
    //         <div ref={dialogRef} className="absolute -bottom-34 right-0 bg-white shadow-md rounded-lg z-50 px-2 py-3 w-40 ">
    //           <p className="text-sm px-2">Create</p>
    //           <ul className="font-semibold  mt-2">
    //             <li className="cursor-pointer  hover:bg-gray-200  p-2 rounded-lg">
    //               <Link href="/pin-builder">Pin</Link>
    //             </li>
    //             <li
    //               className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg  "
    //               onClick={() => {
    //                 setOpenModal(true);
    //                 window.scrollTo(0, 0);
    //               }}
    //             >
    //               Board
    //             </li>
    //           </ul>
    //         </div>
    //       )}
    //     </div>
    <Popover placement="left-start" showArrow={true}>
      <PopoverTrigger>
        <div className="hover:bg-gray-200 z-50 w-10 h-10 grid  place-items-center rounded-full ">
          <FiPlus className="text-2xl text-end cursor-pointer" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="px-2 py-3">
          <div
            className=" bg-white  rounded-lg   w-40 "
          >
            <p className="text-sm px-2">Create</p>
            <ul className="font-semibold  mt-2">
              <li className="cursor-pointer  hover:bg-gray-200  p-2 rounded-lg">
                <Link href="/pin-builder">Pin</Link>
              </li>
              <li
                className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg  "
                onClick={() => {
                  setOpenModal(true);
                  window.scrollTo(0, 0);
                }}
              >
                Board
              </li>
            </ul>
          </div>
      </PopoverContent>
    </Popover>
  );
};

export default CreateDialog;
