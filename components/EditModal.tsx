import { useMutation, useQuery } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdArrowDropDown } from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";
import { editModalState, editPinValue } from "../atom/editAtom";
import { IPin } from "../interface";
import { deletePinMutation } from "../lib/mutation";
import { FeedQuery, firstBoardQuery, PinByUserEmail, UserIdQuery } from "../lib/query";
import BoardDropdown from "./BoardDropdown";
import BoardList from "./BoardList";
import Button from "./Button";
import Loading from "./Loading";

interface IFormInput {
  title:string;
  description:string;
}

const EditModal = () => {
  const editPin = useRecoilValue<IPin | null>(editPinValue);
  const [openEditModal,setEditModal] = useRecoilState(editModalState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<IFormInput>();
  const { user } = useUser();
  const { data:userId } = useQuery(UserIdQuery,{
    variables:{
      userId:user?.email
    }
  });
  console.log(userId)
  const [deletePin] = useMutation(deletePinMutation,{
    refetchQueries:[
      {
        query:FeedQuery
      },{
        query:PinByUserEmail,
        variables:{
          userId:userId?.user.id
        }
      }
    ]
  });

  console.log(editPin);


  const handleDeletePin = async() => {
    await toast.promise(deletePin({variables:{
      pinId:editPin?.id
  }}),{
    loading:"Deleting pin",
    success:"Pin successfully deleted",
    error:"Something went wrong"
  });
  setEditModal(false)
  
  }


  return (
    <div
      className="max-w-4xl mx-auto bg-white rounded-2xl p-4 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="text-center font-semibold text-2xl">Edit this Pin</h1>
      <form className="flex gap-x-4 w-full mt-8 relative">
        <div className="w-3/4 space-y-6">
          <div className="flex  justify-between">
            <label className="flex-[0.25] py-2">Board</label>
            <div className="flex-[0.75]">
              <BoardDropdown />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex-[0.25]">Title</label>
            <input
              {...register("title")}
              type="text"
              defaultValue={editPin?.title}
              className="px-4 py-2 flex-[.75] outline-none focus:ring-4 ring-blue-300 border-2 border-gray-300 rounded-2xl"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex-[0.25]">Description</label>
            <textarea
              {...register("description")}

              defaultValue={editPin?.description}
              className="px-4 py-2 flex-[.75] outline-none focus:ring-4 ring-blue-300 border-2 border-gray-300 rounded-2xl"
            />
          </div>
        </div>
        <Image
          src={editPin?.imageUrl ?? ""}
          className="rounded-xl object-cover"
          width={250}
          height={400}
        />
        
      </form>
      <div className=" w-full   rounded-2xl flex justify-between mt-4">
          <Button text={"Delete"} handleClick={handleDeletePin} color="black" backgroundColor="bg-gray-200" />
          <div className="flex items-center gap-x-3">
            <Button text={"Cancel"}  handleClick={()=>{
              setEditModal(false)
            }} color="black" backgroundColor="bg-gray-200"  />
            <Button text={"Save"}  handleClick={()=>{
              
            }} />
          </div>
       </div>
    </div>
  );
};

export default EditModal;
