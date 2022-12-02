import { useQuery } from "@apollo/client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Loading from "../../../components/Loading";
import UserProfile from "../../../components/UserProfile";
import {
  SavedPinsQuery,
  UserBoardsQuery,
  UserIdQuery,
  UserSavedPins,
} from "../../../lib/query";
import { v4 as uuidv4 } from "uuid";
import { IBoard, IPin } from "../../../interface";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";
import { FiPlus } from "react-icons/fi";
import BoardModal from "../../../components/BoardModal";
import Backdrop from "../../../components/Backdrop";
import { useRecoilState, useRecoilValue } from "recoil";
import { boardModalState, isOpen } from "../../../atom/boardAtom";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { useSession } from "next-auth/react";
const BoardListPage = () => {
  // const { data: userId } = useQuery(UserIdQuery, {
  //   variables: {
  //     userId: user?.email,
  //   },
  // });
  const { data:session } = useSession()

  const { data, loading, error } = useQuery(UserBoardsQuery, {
    variables: {
      userId: session?.user?.id,
    },
  });
  console.log(data);

  const [dialogOpen, setDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null)

  const [openModal, setOpenModal] = useRecoilState(boardModalState);
  useOutsideClick(dialogRef,()=>{
    setDialogOpen(false)
  })
  
  const isBoardOpen = useRecoilValue(isOpen);

  useEffect(() => {
    document.body.style.overflow = isBoardOpen ? "hidden" : "scroll";
  }, [isBoardOpen]);

  return (
    <div>
      <UserProfile />



      {loading && (
        <div className="flex justify-center pt-4">
          <Loading />
        </div>
      )}
      <section className="mx-auto max-w-7xl mt-4 flex flex-col  ">
        <div className="relative self-end">
          <div
            className="hover:bg-gray-200 z-50 w-10 h-10 grid  place-items-center rounded-full "
            onClick={() => setDialogOpen(!dialogOpen)}
          >
            <FiPlus
              className="text-2xl text-end cursor-pointer"
              onClick={() => setDialogOpen(!dialogOpen)}
            />
          </div>
          {dialogOpen && (
            <div ref={dialogRef} className="absolute -bottom-34 right-0 bg-white shadow-md rounded-lg z-50 px-2 py-3 w-40 ">
              <p className="text-sm px-2">Create</p>
              <ul className="font-semibold  mt-2">
                <li className="cursor-pointer  hover:bg-gray-200  p-2 rounded-lg">
                  <Link href="/pin-builder">Pin</Link>
                </li>
                <li
                  className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg  "
                  onClick={() => {
                    setOpenModal(true);
                    window.scrollTo(0, 0);
                  }}
                >
                  Board
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className=" grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
          {data?.userBoards.length !== 0 ? (
            <>
              {data?.userBoards.map((board: IBoard) => (
                <Link href={`saved/${board.id}`}>
                  <div className="bg-gray-400 hover:-translate-y-2 duration-100 ease-in hover:shadow-md cursor-pointer   h-32  rounded-lg grid place-items-center text-white font-bold">
                    <p>{board.name}</p>
                  </div>
                </Link>
              
              ))}
            </>
          ) : (
            <h1 className="text-xl  font-semibold">No pins saved yet</h1>
          )}
        </div>
      </section>
    </div>
  );
};

export default BoardListPage;