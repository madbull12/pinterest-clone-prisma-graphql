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

interface IFormInput {
  title: string;
  description: string;
}

const EditModal = () => {
  const editPin = useRecoilValue<Pin | null>(editPinValue);
  const router = useRouter();
  console.log(editPin);
  const [_, setEditModal] = useRecoilState(editModalState);
  const {
    register,
    handleSubmit,
    // formState: { errors },
    // reset,
    // getValues,
  } = useForm<IFormInput>();
  const { data: session }: any = useSession();
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, () => {
    setEditModal(false);
  });

  const [updatePin] = useMutation(updatePinMutation);
  const onSubmit = async (data: IFormInput) => {
    console.log(editPin?.id);
    const variables = {
      ...data,
      pinId: editPin?.id,
    };
    try {
      await toast.promise(
        updatePin({
          variables,
        }),
        {
          loading: "Updating pin",
          success: "Pin successfully updated",
          error: "Something went wrong!",
        }
      );
    } catch (err) {
      throw new Error("Something went wrong" + err);
    }

    setEditModal(false);
  };

  // const { data: userId } = useQuery(UserIdQuery, {
  //   variables: {
  //     userId: session?.user?.email,
  //   },
  // });
  // console.log(userId);
  const refreshData = () => {
    router.replace(router.asPath, undefined, { scroll: false });
  };
  const [deletePin] = useMutation(deletePinMutation, {
    refetchQueries: [
      {
        query: FeedQuery,
      },
      {
        query: CreatedPins,
        variables: {
          userId: session?.user?.id,
        },
      },
    ],
  });

  console.log(editPin);

  const handleDeletePin = async () => {
    await toast.promise(
      deletePin({
        variables: {
          pinId: editPin?.id,
        },
      }),
      {
        loading: "Deleting pin",
        success: "Pin successfully deleted",
        error: "Something went wrong",
      }
    );
    setEditModal(false);
    refreshData();
  };

  return (
    <div
      ref={modalRef}
      className="max-w-4xl mx-auto bg-white rounded-2xl p-4 relative max-h-[500px] overflow-y-scroll"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
        className="relative"
      >
        <h1 className="text-center font-semibold text-2xl">Edit this Pin</h1>
        <div className="flex flex-col gap-y-4 md:flex-row gap-x-4 w-full mt-8 relative">
          <div className="md:w-3/4 space-y-6">
            <div className="flex gap-x-2  justify-between">
              <label className="flex-[0.25] py-2">Board</label>
              <div className="flex-[0.75]">
                <BoardDropdown />
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
            <video controls className="relative h-full w-full md:w-1/2 rounded-2xl">
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
