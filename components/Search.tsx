import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { useRecoilState } from "recoil";
import { searchModalState } from "../atom/searchAtom";

interface IFormInput {
  searchTerm: string;
}

const Search = () => {
  // const [searchResult, setSearchResult] = useRecoilState(searchResultState);

  const [searchFocus, setSearchFocus] = useState(false);
  const { register, handleSubmit, reset } = useForm<IFormInput>();

  const router = useRouter();
  const [_, setSearchOpen] = useRecoilState(searchModalState);
  
  const onSubmit = async (data: IFormInput) => {
    try {
      // const pins = await apolloClient.query({
      //     query:SearchPinQuery,
      //     variables:data
      // });
      // setSearchResult(pins?.data.searchPins);
      router.push(`/search?q=${data.searchTerm}`);
    } catch (err) {
      console.log(err);
    } finally {
      reset();
      setSearchOpen(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex w-full md:w-1/2 gap-x-2 items-center ${
        searchFocus ? "ring-blue-300 ring-4" : ""
      }  bg-gray-200 px-4 py-2 rounded-full`}
    >
      <FiSearch className="text-gray-500 text-xl " />
      <input
        type="text"
        {...register("searchTerm")}
        className="outline-none bg-transparent w-full "
        onFocus={() => setSearchFocus(true)}
        onBlur={() => setSearchFocus(false)}
        placeholder="Search "
      />
    </form>
  );
};

export default Search;
