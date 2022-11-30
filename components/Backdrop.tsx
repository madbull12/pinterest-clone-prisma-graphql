import React, { ReactNode } from "react";
import { useRecoilState } from "recoil";
import { boardModalState } from "../atom/boardAtom";
import { editModalState } from "../atom/editAtom";

const Backdrop = ({ children }: { children: ReactNode }) => {

  return (
    <div
      className="bg-[#00000077] absolute min-h-screen z-[999] top-0 right-0 bottom-0 left-0 p-4  "

    >
      {children}
    </div>
  );
};

export default Backdrop;
