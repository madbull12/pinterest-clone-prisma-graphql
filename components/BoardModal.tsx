import { useMutation, useQuery } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { createBoardMutation } from "../lib/mutation";
import { UserIdQuery } from "../lib/query";
import Backdrop from "./Backdrop";

const BoardModal = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [name, setName] = useState("");
  const { user } = useUser();
  

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const [createBoard] = useMutation(createBoardMutation);
  const { data:userId } = useQuery(UserIdQuery,{
    variables:{
        userId:user?.email
    }
}); 

  const handleSubmit = async(e: React.SyntheticEvent) => {
    e.preventDefault()
    const variables = { name,userId:userId?.user.id,secret:isChecked};
    try{
        await toast.promise(createBoard({ variables }),{
            loading: 'Creating new board..',
            success: 'Board successfully created!🎉',
            error: `Something went wrong 😥 Please try again `,
        })
    } catch(err) {
        console.log(err)
    }

  }

  return (
    <div
      className="p-8 rounded-3xl shadow-md max-w-xl mx-auto bg-white mt-36"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-xl mb-4 text-center font-semibold">Create Board</p>
      <form className="space-y-3 flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-2">
          <label className="text-xs">Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder='Like  "Places to Go" or "Recipes to Make" '
            className="rounded-xl border-2 px-4 py-3 outline-none ring-blue-300 focus:ring-4 border-gray-300"
          />
        </div>
        <div className="flex gap-x-3">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleOnChange}
          />

          <div>
            <p className="text-lg font-semibold">Keep this board secret</p>
            <p className="text-gray-500">
              So only you and collaborators can see it.
            </p>
          </div>
        </div>
        <button className="px-4 py-2 bg-[#E60023] text-white font-semibold rounded-full self-end" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default BoardModal;
