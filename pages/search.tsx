import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useMemo } from "react";
import Masonry from "react-masonry-css";
import { useRecoilValue } from "recoil";
import { searchResults } from "../atom/searchAtom";
import { IPin } from "../interface";
import { v4 as uuidv4, v4 } from "uuid";
import { FiPlus } from "react-icons/fi";
import MasonryWrapper from "../components/MasonryWrapper";
import Pin from "../components/Pin";
import Container from "../components/Container";

const SearchPage = () => {
  const pins = useRecoilValue<any>(searchResults);
  console.log(pins);
  return (
    <Container>
      {pins?.length !== 0 ? (
        <>
        <h1 className="md:text-2xl text-xl py-4 text-center font-bold">Search results</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4">
            {pins?.map((item: IPin) => (
              <Pin item={item} key={v4()} />
            ))}
          </div>
        </>
      ) : (
        <h1 className="md:text-2xl text-xl py-4 text-center font-bold">No Pins found</h1>
      )}

      {/* array of JSX items */}
    </Container>
  );
};

export default SearchPage;
