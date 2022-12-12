import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import { searchModalState } from "../atom/searchAtom";
import useOutsideClick from "../hooks/useOutsideClick";
import Search from "./Search";

const SearchModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [searchOpen, setSearchOpen] = useRecoilState(searchModalState);
  useOutsideClick(modalRef, () => {
    setSearchOpen(false);
  });
  return (
    <div
      ref={modalRef}
      className="max-w-sm mx-auto bg-white rounded-2xl p-2 relative  overflow-y-scroll"
    >
        <Search />
    </div>
  );
};

export default SearchModal;
