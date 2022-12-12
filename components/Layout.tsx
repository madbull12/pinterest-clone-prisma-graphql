import React, { ReactNode,useEffect } from "react";
import { useRecoilValue } from "recoil";
import { isOpen } from "../atom/boardAtom";
import { isEditOpen } from "../atom/editAtom";
import { isSearchOpen } from "../atom/searchAtom";
import useMediaQuery from "../hooks/useMediaQuery";
import Backdrop from "./Backdrop";
import BoardModal from "./BoardModal";
import EditModal from "./EditModal";
import MobileNav from "./MobileNav";
import Navbar from "./Navbar";
import SearchModal from "./SearchModal";


const Layout = ({ children }: { children: ReactNode }) => {
  const isBoardOpen = useRecoilValue(isOpen);
  const isNotMobile = useMediaQuery('(min-width: 768px)')
const isEditOpenValue = useRecoilValue(isEditOpen);
const searchOpen  = useRecoilValue(isSearchOpen)


useEffect(() => {
  document.body.style.overflow = isBoardOpen ? "hidden" : "scroll";
  document.body.style.overflow = searchOpen ? "hidden" : "scroll";
}, [isBoardOpen,searchOpen]);

  return (
    <div>
      {isBoardOpen && (
        <Backdrop>
          <BoardModal />
        </Backdrop>
      )}
        {isEditOpenValue && (
          <Backdrop>
            <EditModal />
          </Backdrop>
        )}
        {searchOpen && (
          <Backdrop>
            <SearchModal />
          </Backdrop>
        )}
      {isNotMobile ? <Navbar /> : <MobileNav />}
      
      {children}
    </div>
  );
};

export default Layout;
