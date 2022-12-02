import React, { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { isOpen } from "../atom/boardAtom";
import Backdrop from "./Backdrop";
import BoardModal from "./BoardModal";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  const isBoardOpen = useRecoilValue(isOpen);

  return (
    <div>
      {isBoardOpen && (
        <Backdrop>
          <BoardModal />
        </Backdrop>
      )}
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
