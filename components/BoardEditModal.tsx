import React, { useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { useRecoilState } from "recoil";
import { boardEditModal } from "../atom/boardAtom";
import { useRouter } from "next/router";
import Loading from "./Loading";
import { ValidationBoard, boardValidation } from "../lib/validations/board";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../utils/trpc";
import useBoardMutation from "../hooks/useBoardMutation";

const BoardEditModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [_, setModalOpen] = useRecoilState(boardEditModal);
  useOutsideClick(modalRef, () => {
    setModalOpen(false);
  });
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
  } = useForm<ValidationBoard>({
    resolver: zodResolver(boardValidation),
  });

  const callback = () => {
    reset();
    setModalOpen(false);

  }

  const { handleDeleteBoard,handleUpdateBoard } = useBoardMutation({
    name:watch("name"),
    description:watch("description") as string,
    secret:watch("secret")
  },callback)

  const { boardId } = useRouter().query;

  const { data, isLoading } = trpc.board.singleBoard.useQuery({
    boardId:boardId as string
  })


  // const handleDeleteBoard = async () => {
  //   await toast.promise(
  //     deleteBoard({
  //       variables: {
  //         deleteBoardId: boardId,
  //       },
  //     }),
  //     {
  //       loading: "Deleting board",
  //       success: "Board deleted",
  //       error: "Oops something went wrong...",
  //     }
  //   );
  //   setModalOpen(false);
  // };

  // const onSubmit: SubmitHandler<ValidationBoard> = async (data) => {
  //   console.log(data);

  //   await toast.promise(
  //     updateBoard({
  //       variables: {
  //         updateBoardId: boardId,
  //         name: data.name,
  //         secret: data.secret,
  //         description: data.description,
  //       },
  //     }),
  //     {
  //       loading: "Updating board",
  //       success: "Board Updated",
  //       error: "Oops something went wrong...",
  //     }
  //   );
  //   setModalOpen(false);
  // };

  return (
    <div
      className="p-8 rounded-3xl shadow-md max-w-xl mx-auto bg-white mt-16"
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <p className="text-xl mb-4 text-center font-semibold">Edit board</p>
          <form
            className="space-y-3 flex flex-col"
            onSubmit={handleSubmit(handleUpdateBoard)}
          >
            <div className="flex flex-col gap-y-2">
              <label className="text-xs">Name</label>
              <input
                // onChange={(e) => setName(e.target.value)}
                {...register("name")}
                defaultValue={data?.name}
                type="text"
                className="rounded-xl border-2 px-4 py-3 outline-none ring-blue-300 focus:ring-4 border-gray-300"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-xs">Description</label>
              <input
                // onChange={(e) => setName(e.target.value)}
                {...register("description")}
                defaultValue={data?.description as string}
                type="text"
                className="rounded-xl border-2 px-4 py-3 outline-none ring-blue-300 focus:ring-4 border-gray-300"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-xs">Settings</label>
              <div className="flex items-center gap-x-2">
              <Controller
            name="secret"
            control={control}
            defaultValue={data?.secret}
            render={({ field }) => (
              <input
              
                type="checkbox"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
          </div>
          <div>
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
              <button
                onClick={handleDeleteBoard}
                type="button"
                className="font-semibold text-xl self-start"
              >
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
