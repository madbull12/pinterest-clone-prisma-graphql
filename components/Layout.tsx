import React, { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { isOpen } from "../atom/boardAtom";
import useMediaQuery from "../hooks/useMediaQuery";
import Backdrop from "./Backdrop";
import BoardModal from "./BoardModal";
import MobileNav from "./MobileNav";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  const isBoardOpen = useRecoilValue(isOpen);
  const isNotMobile = useMediaQuery('(min-width: 768px)')
  return (
    <div>
      {isBoardOpen && (
        <Backdrop>
          <BoardModal />
        </Backdrop>
      )}
      {isNotMobile ? <Navbar /> : <MobileNav />}
      
      {children}
    </div>
  );
};

export default Layout;
