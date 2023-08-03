import React, { useRef,useState } from 'react'
import useOutsideClick from '../hooks/useOutsideClick';
import { useRecoilState } from 'recoil';
import { boardEditModal } from '../atom/boardAtom';
import { useQuery } from '@apollo/client';
import { SingleBoard } from '../lib/query';
import { useRouter } from 'next/router';

const BoardEditModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [_,setModalOpen] = useRecoilState(boardEditModal);
  useOutsideClick(modalRef,()=>{
    setModalOpen(false)
  });

  const { boardId } = useRouter().query;

  const {data,loading } = useQuery(SingleBoard,{
    variables:{
        boardId
    }
  })

  console.log(data)

  return (
    <div
      className="p-8 rounded-3xl shadow-md max-w-xl mx-auto bg-white mt-36"
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
    >
      <p className="text-xl mb-4 text-center font-semibold">Edit board</p>
      <form className="space-y-3 flex flex-col" >
        <div className="flex flex-col gap-y-2">
          <label className="text-xs">Name</label>
          <input
            // onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder='Like  "Places to Go" or "Recipes to Make" '
            className="rounded-xl border-2 px-4 py-3 outline-none ring-blue-300 focus:ring-4 border-gray-300"
          />
        </div>
        <div className="flex gap-x-3">
          {/* <input
            type="checkbox"
            checked={isChecked}
            onChange={handleOnChange}
          /> */}

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
  )
}

export default BoardEditModal