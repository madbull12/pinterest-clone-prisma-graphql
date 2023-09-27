import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { createPinMutation } from "../lib/mutation";
import { FeedQuery } from "../lib/query";
import { HiDotsHorizontal, HiTrash, HiUpload } from "react-icons/hi";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Container from "../components/Container";
import useMediaQuery from "../hooks/useMediaQuery";

import CategoryTag from "../components/CategoryTag";
import usePinCreation from "../hooks/usePinCreation";
import { IFormPinInput } from "../interface";



const PinBuilder = () => {
  const { data: session } = useSession();
  const [textAreaFocus, setTextAreaFocus] = useState(false);
  const [textAreaCount, setTextAreaCount] = useState(500);


  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<IFormPinInput>();
  const {
    addCategory,
    deleteCategory,
    handleCreatePin,
    selectedFile,
    onSelectFile,
    preview,
    removeSelectedFile,
    categories,
  } = usePinCreation(
    {
      title: watch("title"),
      description: watch("description"),
    },
    reset,
    getValues
  );



 

  const isNotMobile = useMediaQuery("(min-width: 768px)");

  return (
    <div className="bg-gray-200">
      <Container>
        <div className="min-h-screen  py-8 ">
          <form
            className="shadow-md p-8 rounded-2xl max-w-3xl bg-white mx-auto"
            onSubmit={handleSubmit(handleCreatePin)}
          >
            <div className="flex items-center justify-between">
              <HiDotsHorizontal className="text-2xl text-gray-400" />
              <button
              disabled={!selectedFile}
                className="rounded-full disabled:bg-gray-400 bg-[#E60023] md:px-4 px-2 py-1 md:py-2 text-white font-semibold"
                type="submit"
              >
                Publish
              </button>
            </div>
            <div className="flex flex-col gap-y-4 mt-4 sm:flex-row items-center sm:items-start w-full sm:gap-x-4 ">
              {selectedFile ? (
                <>
                  {selectedFile.type === "video/mp4" ? (
                    <div className="relative w-full md:w-1/2 h-full">
                      <video
                        controls
                        className="relative h-full w-full rounded-2xl"
                      >
                        <source src={preview} type="video/mp4"></source>
                      </video>
                      <button
                        className="absolute top-0 w-10 h-10 rounded-full bg-white place-items-center grid opacity-75 m-4"
                        onClick={removeSelectedFile}
                      >
                        <HiTrash />
                      </button>
                    </div>
                  ) : (
                    <div className="relative w-full md:w-1/2 h-full">
                      <img
                        src={preview || ""}
                        className="w-full h-full rounded-lg "
                      />
                      <button
                        className="absolute top-0 w-10 h-10 rounded-full bg-white place-items-center grid opacity-75 m-4"
                        onClick={removeSelectedFile}
                      >
                        <HiTrash />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-gray-200 w-full sm:w-1/2  rounded-lg cursor-pointer p-4">
                  <div className="rounded-lg  cursor-center  space-y-2  text-gray-500  border-dashed border-2 p-4 border-gray-300 w-full h-full">
                    <label
                      htmlFor="upload"
                      className="items-center flex flex-col justify-center pt-16 cursor-pointer"
                    >
                      <HiUpload className="text-3xl" />
                      <p className="text-center">
                        Click to upload image or video
                      </p>

                      <input
                        accept="image/png, image/gif, image/jpeg,video/mp4,video/x-m4v,video/*"
                        type="file"
                        id="upload"
                        onChange={onSelectFile}
                        className="h-full opacity-0 w-full cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              )}

              <div className="flex flex-col w-full sm:w-1/2 space-y-3  ">
                <input
                  className="p-2 text-2xl md:text-4xl text-gray-800 focus:border-blue-500 focus:border-b-2 placeholder:text-gray-500 outline-none border-gray-300 border-b font-bold"
                  type="text"
                  placeholder="Add your title"
                  {...register("title", { required: true })}
                />
                <div className="gap-x-3 items-center flex">
                  <Image
                    src={session?.user?.image || ""}
                    width={isNotMobile ? 50 : 35}
                    height={isNotMobile ? 50 : 35}
                    className="rounded-full"
                    alt="profile"
                  />
                  <p className="font-semibold text-sm md:text-base">
                    {session?.user?.name}
                  </p>
                </div>
                <div className="flex flex-col">
                  <textarea
                    {...register("description")}
                    className={`outline-none border-b p-2 ${
                      textAreaCount > 0
                        ? "focus:border-blue-500"
                        : "focus:border-red-500"
                    } focus:border-b-2`}
                    placeholder="Tell everyone what your pin is about"
                    onFocus={() => setTextAreaFocus(true)}
                    onBlur={() => setTextAreaFocus(false)}
                    onChange={(e) =>
                      setTextAreaCount(500 - e.target.value.length)
                    }
                  />
                  {textAreaFocus && (
                    <>
                      {textAreaCount > 0 ? (
                        <div className="flex justify-between items-center text-xs text-gray-400">
                          <p>We recommend at least 100 characters</p>
                          <p>{textAreaCount}</p>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center text-xs text-red-600">
                          <p>
                            Ooops! This description is getting long. Try
                            trimming it down.
                          </p>
                          <p>{textAreaCount}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <input
                      className="md:px-4 px-2 py-1 md:py-2 w-1/2 sm:w-3/4 outline-none focus:border-blue-500 focus:border-b-2"
                      placeholder="Add categories"
                      type="text"
                      {...register("category")}
                    />
                    {/* <Button
                text="Add"
                handleClick={(e: React.SyntheticEvent) => {
                  e.preventDefault();

                  addCategory();
                }}
              /> */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();

                        addCategory();
                      }}
                      className="px-2 md:px-4 py-1 bg-[#E60023] text-white font-semibold rounded-full"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex items-center flex-wrap gap-x-4 mt-4 ">
                    {categories.map((category, i) => (
                      <div onClick={() => deleteCategory(i)} key={i}>
                        <CategoryTag category={category} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default PinBuilder;
