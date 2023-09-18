import { useMutation } from "@apollo/client";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { boardModalState } from "../atom/boardAtom";
import useOutsideClick from "../hooks/useOutsideClick";
import { createBoardMutation } from "../lib/mutation";
import { useSession } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import useBoardMutation from "../hooks/useBoardMutation";

type FormValues = {
  name: string;
  secret: boolean;
};
const BoardModal = () => {
  const [isChecked, setIsChecked] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [_, setOpenModal] = useRecoilState(boardModalState);

  const { register, handleSubmit, watch, reset, control } =
    useForm<FormValues>({
      defaultValues:{
        name:"",
        secret:false
      }
    });

  const callbackBoardMutation = () => {
    reset();
    setOpenModal(false);
  };

  const { handleCreateBoard } = useBoardMutation(
    {
      name: watch("name"),
      secret: watch("secret"),
    },
    callbackBoardMutation
  );

  useOutsideClick(modalRef, () => {
    setOpenModal(false);
  });


  // const handleSubmit = async (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   const variables = { name, userId: session?.user?.id, secret: isChecked };
  //   try {
  //     await toast.promise(createBoard({ variables }), {
  //       loading: "Creating new board..",
  //       success: "Board successfully created!🎉",
  //       error: `Something went wrong 😥 Please try again `,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   setOpenModal(false);
  // };

  return (
    <div
      className="p-8 rounded-3xl shadow-md max-w-xl mx-auto bg-white mt-36"
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
    >
      <p className="text-xl mb-4 text-center font-semibold">Create Board</p>
      <form
        className="space-y-3 flex flex-col"
        onSubmit={handleSubmit(handleCreateBoard)}
      >
        <div className="flex flex-col gap-y-2">
          <label className="text-xs">Name</label>
          <input
            {...register("name")}
            type="text"
            placeholder='Like  "Places to Go" or "Recipes to Make" '
            className="rounded-xl border-2 px-4 py-3 outline-none ring-blue-300 focus:ring-4 border-gray-300"
          />
        </div>
        <div className="flex gap-x-3">
          <Controller
            name="secret"
            control={control}
            render={({ field }) => (
              <input
              
                type="checkbox"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <div>
            <p className="text-lg font-semibold">Keep this board secret</p>
            <p className="text-gray-500">
              So only you and collaborators can see it.
            </p>
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 self-end font-semibold text-white bg-[#E60023] rounded-full"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default BoardModal;
