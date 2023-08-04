import React, { useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { useRecoilState } from "recoil";
import { boardEditModal } from "../atom/boardAtom";
import { useMutation, useQuery } from "@apollo/client";
import { SingleBoard } from "../lib/query";
import { useRouter } from "next/router";
import Loading from "./Loading";
import { ValidationBoard, boardValidation } from "../lib/validations/board";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateBoardMutation } from "../lib/mutation";

const BoardEditModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [_, setModalOpen] = useRecoilState(boardEditModal);
  useOutsideClick(modalRef, () => {
    setModalOpen(false);
  });

  const [updateBoard] = useMutation(updateBoardMutation,{
    onCompleted() {
      console.log("haha")
    },
  })

  const { boardId } = useRouter().query;

  const { data, loading } = useQuery(SingleBoard, {
    variables: {
      boardId,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationBoard>({
    resolver: zodResolver(boardValidation),
  });

  const onSubmit:SubmitHandler<ValidationBoard> = async(data) => {
    console.log(data)

    await updateBoard({
      variables:{
        updateBoardId:boardId,
        name:data.name,
        secret:data.secret,
        description:data.description,
      }
    })
  }

  return (
    <div
      className="p-8 rounded-3xl shadow-md max-w-xl mx-auto bg-white mt-16"
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <p className="text-xl mb-4 text-center font-semibold">Edit board</p>
          <form className="space-y-3 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-2">
              <label className="text-xs">Name</label>
              <input
                // onChange={(e) => setName(e.target.value)}
                {...register("name")}

                defaultValue={data?.singleBoard?.name}
                type="text"
                className="rounded-xl border-2 px-4 py-3 outline-none ring-blue-300 focus:ring-4 border-gray-300"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-xs">Description</label>
              <input
                // onChange={(e) => setName(e.target.value)}
                {...register("description")}
                defaultValue={data?.singleBoard?.description}
                type="text"
                className="rounded-xl border-2 px-4 py-3 outline-none ring-blue-300 focus:ring-4 border-gray-300"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-xs">Settings</label>
              <div className="flex items-center gap-x-2">
                <input
                  {...register("secret")}
                  defaultChecked={data?.singleBoard?.secret}
                  type="checkbox"
                  className="accent-gray-900 rounded-lg w-6 h-6 ring-blue-300 focus:ring-4"
                />
                <div className="leading-6">
                  <h4 className="font-semibold">Hide this board</h4>
                  <p className="text-gray-500">
                    So that only you can view this board
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-xs">Action</label>
              <button type="button" className="font-semibold text-xl self-start">
                Delete board
              </button>
            </div>

            <button
              type="submit"
              className="px-4 py-2 self-end font-semibold text-white bg-[#E60023] rounded-full"
            >
              Update board
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default BoardEditModal;
