import { useMutation } from "@apollo/client";
import Image from "next/image";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { editModalState, editPinValue } from "../atom/editAtom";
import useOutsideClick from "../hooks/useOutsideClick";
import { deletePinMutation, updatePinMutation } from "../lib/mutation";
import { CreatedPins, FeedQuery } from "../lib/query";
import BoardDropdown from "./BoardDropdown";
import Button from "./Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Pin } from "@prisma/client";
import usePinEdit from "../hooks/usePinEdit";

interface IFormInput {
  title: string;
  description: string;
  boardId?: string;
}

const EditModal = () => {
  const editPin = useRecoilValue<Pin | null>(editPinValue);
  const [_, setEditModal] = useRecoilState(editModalState);
  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
    // reset,
    // getValues,
  } = useForm<IFormInput>();
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, () => {
    setEditModal(false);
  });

  const updateCallback = () => {
    setEditModal(false);
  };

  const { handleDeletePin, handleUpdatePin } = usePinEdit(
    {
      title: watch("title"),
      description: watch("description"),
      boardId: watch("boardId"),
    },
    updateCallback
  );

  return (
    <div
      ref={modalRef}
      className="max-w-4xl mx-auto bg-white rounded-2xl p-4 relative max-h-[500px] overflow-y-scroll"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(handleUpdatePin)}
        className="relative"
      >
        <h1 className="text-center font-semibold text-2xl">Edit this Pin</h1>
        <div className="flex flex-col gap-y-4 md:flex-row gap-x-4 w-full mt-8 relative">
          <div className="md:w-3/4 space-y-6">
            <div className="flex gap-x-2  justify-between">
              <label className="flex-[0.25] py-2">Board</label>
              <div className="flex-[0.75]">
                <BoardDropdown register={register} />
              </div>
            </div>
            <div className="flex items-center gap-x-2 justify-between">
              <label className="flex-[0.25]">Title</label>
              <input
                {...register("title")}
                type="text"
                defaultValue={editPin?.title}
                className="px-4 py-2 flex-[.75] outline-none focus:ring-4 ring-blue-300 border-2 border-gray-300 rounded-2xl"
              />
            </div>
            <div className="flex items-center gap-x-2 justify-between">
              <label className="flex-[0.25]">Description</label>
              <textarea
                {...register("description")}
                defaultValue={editPin?.description as string}
                className="px-4 py-2 flex-[.75] outline-none focus:ring-4 ring-blue-300 border-2 border-gray-300 rounded-2xl"
              />
            </div>
          </div>
          {editPin?.media.includes("video") ? (
            <video
              controls
              className="relative h-full w-full md:w-1/2 rounded-2xl"
            >
              <source src={editPin?.media} type="video/mp4"></source>
            </video>
          ) : (
            <Image
              alt="modal-edit-image"
              src={editPin?.media ?? ""}
              className="rounded-xl object-cover"
              width={250}
              height={400}
            />
          )}
        </div>
        <div className="  mt-4">
          <div className="flex items-center gap-x-3 justify-end">
            <Button
              text={"Cancel"}
              handleClick={() => {
                setEditModal(false);
              }}
              color="black"
              backgroundColor="bg-gray-200"
            />
            <Button text={"Save"} type="submit" />
          </div>
        </div>
        <div className="absolute bottom-0 left-2">
          <Button
            text={"Delete"}
            type="button"
            handleClick={handleDeletePin}
            color="black"
            backgroundColor="bg-gray-200"
          />
        </div>
      </form>
    </div>
  );
};

export default EditModal;
