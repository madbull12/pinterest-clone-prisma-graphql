import { useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import Loading from "../../../components/Loading";
import UserProfile from "../../../components/UserProfile";
import {
  SavedPinsQuery,
  UserBoardsQuery,
  UserSavedPins,
} from "../../../lib/query";
import { v4 as uuidv4 } from "uuid";


import { useRecoilState, useRecoilValue } from "recoil";
import { boardModalState, isOpen } from "../../../atom/boardAtom";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { signOut, useSession } from "next-auth/react";
import UserBoardsList from "../../../components/UserBoardsList";
import CreateDialog from "../../../components/CreateDialog";
import Container from "../../../components/Container";
import useMediaQuery from "../../../hooks/useMediaQuery";
import Button from "../../../components/Button";
const BoardListPage = () => {
  // const { data: userId } = useQuery(UserIdQuery, {
  //   variables: {
  //     userId: user?.email,
  //   },
  // });

  const isNotMobile = useMediaQuery('(min-width: 768px)')

  const { data: session }: any = useSession();

  const { data, loading, error } = useQuery(UserBoardsQuery, {
    variables: {
      userId: session?.user?.id,
    },
  });
  console.log(data);


  return (
    <Container>
      <UserProfile />

      {loading && (
        <div className="flex justify-center pt-4">
          <Loading />
        </div>
      )}
      <section className="mx-auto max-w-7xl mt-4 flex flex-col  ">
        <div className="ml-auto flex items-center gap-x-2">
          {!isNotMobile ? (
            <Button text="Logout" handleClick={()=>signOut()} />
          ):null}
          <CreateDialog />

        </div>
        <UserBoardsList userBoards={data?.userBoards} />
      </section>
    </Container>
  );
};

export default BoardListPage;
