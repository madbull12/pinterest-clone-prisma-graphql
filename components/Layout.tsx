import React, { ReactNode, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { isEditBoardOpen, isOpen } from "../atom/boardAtom";
import { isEditOpen } from "../atom/editAtom";
import { isSearchOpen } from "../atom/searchAtom";
import useMediaQuery from "../hooks/useMediaQuery";
import Backdrop from "./Backdrop";
import BoardModal from "./BoardModal";
import EditModal from "./EditModal";
import MobileNav from "./MobileNav";
import Navbar from "./Navbar";
import SearchModal from "./SearchModal";
import BoardEditModal from "./BoardEditModal";

const Layout = ({ children }: { children: ReactNode }) => {
  const isBoardOpen = useRecoilValue(isOpen);
  const isNotMobile = useMediaQuery("(min-width: 768px)");
  const isEditOpenValue = useRecoilValue(isEditOpen);
  const searchOpen = useRecoilValue(isSearchOpen);
  const _isEditBoardOpen = useRecoilValue(isEditBoardOpen);

  useEffect(() => {
    document.body.style.overflowY = isBoardOpen ? "hidden" : "scroll";
    document.body.style.overflowY = searchOpen ? "hidden" : "scroll";
    document.body.style.overflowY = _isEditBoardOpen? "hidden" : "scroll";
  }, [isBoardOpen, searchOpen,_isEditBoardOpen]);

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

      {_isEditBoardOpen && (
        <Backdrop>
          <BoardEditModal />
        </Backdrop>
      )}
      {isNotMobile ? <Navbar /> : <MobileNav />}

      {children}
    </div>
  );
};

export default Layout;
