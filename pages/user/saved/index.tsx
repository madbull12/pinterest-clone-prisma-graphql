import { useQuery } from "@apollo/client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Loading from "../../../components/Loading";
import UserProfile from "../../../components/UserProfile";
import {
  SavedPinsQuery,
  UserBoardsQuery,
  UserSavedPins,
} from "../../../lib/query";
import { v4 as uuidv4 } from "uuid";
import { IBoard, IPin } from "../../../interface";
import Image from "next/image";
import { FiPlus } from "react-icons/fi";
import BoardModal from "../../../components/BoardModal";
import Backdrop from "../../../components/Backdrop";
import { useRecoilState, useRecoilValue } from "recoil";
import { boardModalState, isOpen } from "../../../atom/boardAtom";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { useSession } from "next-auth/react";
import UserBoard from "../../../components/UserBoard";
import UserBoardsList from "../../../components/UserBoardsList";
import CreateDialog from "../../../components/CreateDialog";
import Container from "../../../components/Container";
const BoardListPage = () => {
  // const { data: userId } = useQuery(UserIdQuery, {
  //   variables: {
  //     userId: user?.email,
  //   },
  // });
  const { data:session }:any = useSession()

  const { data, loading, error } = useQuery(UserBoardsQuery, {
    variables: {
      userId: session?.user?.id,
    },
  });
  console.log(data);





  
  const isBoardOpen = useRecoilValue(isOpen);

  useEffect(() => {
    document.body.style.overflow = isBoardOpen ? "hidden" : "scroll";
  }, [isBoardOpen]);

  return (
    <Container>
      <UserProfile />



      {loading && (
        <div className="flex justify-center pt-4">
          <Loading />
        </div>
      )}
      <section className="mx-auto max-w-7xl mt-4 flex flex-col  ">
        <CreateDialog />
        <UserBoardsList userBoards={data?.userBoards} />
    
      </section>
    </Container>
  );
};

export default BoardListPage;