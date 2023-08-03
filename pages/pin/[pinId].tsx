import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { RelatedPins, SinglePinQuery, UserBoardsQuery } from "../../lib/query";
import {
  HiArrowLeft,
  HiDotsHorizontal,
  HiDownload,
  HiLink,
} from "react-icons/hi";
import { IBoard, ICategory, IComment, IPin, ISaved } from "../../interface";
import Image from "next/image";
import { MdExpandMore } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import Loading from "../../components/Loading";
import { createCommentMutation, deleteSaveMutation } from "../../lib/mutation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { boardModalState } from "../../atom/boardAtom";
import Container from "../../components/Container";
import RelatedPinsComponent from "../../components/RelatedPins";
import Comment from "../../components/Comment";
import SaveDialog from "../../components/SaveDialog";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useSavedMutation } from "../../hooks/useSaved";
import { BoardWithPayload } from "../../types/board";
import Link from "next/link";
import { Pin } from "@prisma/client";

const PinDetail = () => {
  const [expandComment, setExpandComment] = useState(false);
  const [value, copy] = useCopyToClipboard();
  const saveDialogRef = useRef<HTMLDivElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const { pinId } = router.query;
  const commentInputRef = useRef<any>(null);
  const { data: session, status }: any = useSession();

  const [contentFocus, setContentFocus] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  const { handleSubmit } = useForm();

  const [createComment] = useMutation(createCommentMutation, {
    refetchQueries: [SinglePinQuery],
  });
  const btnRef = useRef(null);

  useOutsideClick(saveDialogRef, () => {
    setOpenDialog(false);
  });

  const { data, loading, error } = useQuery(SinglePinQuery, {
    variables: {
      pinId,
    },
  });

  const { pin }: { pin: IPin } = data || {};

  const { data: relatedPins } = useQuery(RelatedPins, {
    variables: {
      categories: pin?.categories?.map((category: ICategory) => category.name),
      pinId,
    },
  });
  console.log(relatedPins);

  const [openModal, setOpenModal] = useRecoilState(boardModalState);

  const { data: userBoards } = useQuery(UserBoardsQuery, {
    variables: {
      userId: session?.user?.id,
    },
  });

  const addComment = async () => {
    const variables = {
      content,
      userId: session?.user?.id,
      pinId,
    };
    try {
      await toast.promise(createComment({ variables }), {
        loading: "Posting comment...",
        success: "Comment posted 👏👏",
        error: "Oops something went wrong 😢",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setContent("");
    }
  };

  const payload = {
    boardId: userBoards?.userBoards[0]?.id,
    userId: session?.user?.id as string,
    pinId: pinId as string,
  };
  const { handleDeleteSavedPin, handleSavePin } = useSavedMutation(payload);
  const savedInBoard = userBoards?.userBoards[0]?.saved.find(
    (v: any) => v.pin.id === pinId
  );

  if (loading)
    return (
      <div className="flex justify-center py-4">
        <Loading />
      </div>
    );
  if (error) return <p>{error.message}</p>;
  return (
    <Container>
      <div className="flex gap-x-8">
        <HiArrowLeft
          className="text-3xl cursor-pointer hidden md:block "
          onClick={() => router.back()}
        />
        <section className="shadow-lg relative rounded-3xl w-full flex flex-col md:flex-row">
          <div className="  w-full md:w-1/2 max-h-96 ">
            {pin.media.includes("video") ? (
              <video
                controls
                className="relative h-96 mt-14  md:mt-0  w-full rounded-2xl"
              >
                <source src={pin?.media} type="video/mp4"></source>
              </video>
            ) : (
              <div className="relative w-full h-96 mt-14  md:mt-0   ">
                <Image
                  src={pin.media}
                  alt="image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-3xl "
                />
              </div>
            )}
          </div>
          <div className="p-4 md:p-8 w-full">
            <nav className="flex justify-between md:static top-2 absolute w-full  left-0 px-4 items-center  ">
              <div className="space-x-3 md:space-x-6   flex text-base md:text-2xl">
                <HiDotsHorizontal />
                <HiDownload />
                <HiLink
                  className="cursor-pointer"
                  onClick={() => {
                    copy(window.location.href);
                    toast.success("Link copied to clipboard");
                  }}
                />
              </div>

              <div className="ml-auto flex items-center gap-x-4">
                {userBoards?.userBoards.length !== 0 ||
                status === "authenticated" ? (
                  <button
                    ref={btnRef}
                    className="flex items-center relative "
                    onClick={() => setOpenDialog(!openDialog)}
                  >
                    <MdExpandMore className="text-xl " />
                    <p className="">{userBoards?.userBoards[0]?.name}</p>

                    {openDialog && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        ref={saveDialogRef}
                        className="absolute top-8 -right-8 sm:right-8 w-56 sm:w-96 z-50"
                      >
                        <SaveDialog userBoards={userBoards?.userBoards} />
                      </div>
                    )}
                  </button>
                ) : null}
                <>
                  {status === "authenticated" ? (
                    <Button
                      text={savedInBoard ? "Unsave" : "Save"}
                      handleClick={() => {
                        userBoards?.userBoards.length !== 0
                          ? savedInBoard
                            ? handleDeleteSavedPin(savedInBoard?.id)
                            : handleSavePin()
                          : setOpenModal(true);
                      }}
                    />
                  ) : null}
                </>
              </div>
            </nav>
            <div className="mt-8  pt-4 md:pt-0 space-y-3">
              <h1 className="text-2xl md:text-4xl font-bold">{pin.title}</h1>
              <p className="text-sm md:text-base">{pin.description}</p>
              <Link href={`/user/${data?.pin.user.id}/created`}>
                <div className="flex gap-x-3 cursor-pointer items-center">
                  <div className="relative w-8 h-8">
                    <Image
                      alt="user-avatar"
                      className="rounded-full"
                      src={
                        data?.pin.user.image ||
                        "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
                      }
                      layout="fill"
                    />
                  </div>

                  <p className="w-1/2 text-xs sm:text-sm md:text-base">
                    {data?.pin.user.email}
                  </p>
                </div>
              </Link>

              <div>
                {pin.comments.length !== 0 ? (
                  <div
                    className="flex items-center gap-x-2 font-semibold text-xl mb-4 cursor-pointer"
                    onClick={() => setExpandComment((prev) => !prev)}
                  >
                    <span>{pin.comments.length} Comments</span>
                    <MdExpandMore className="text-2xl  " />
                  </div>
                ) : null}

                {expandComment && (
                  <div className="space-y-2 my-2">
                    {pin.comments.map((comment: IComment) => (
                      <Comment key={uuidv4()} comment={comment} />
                    ))}
                  </div>
                )}

                <form
                  className="flex flex-col"
                  onSubmit={handleSubmit(addComment)}
                >
                  <div className="flex gap-x-4 w-full items-center ">
                    {status === "authenticated" && (
                      <Image
                        src={session?.user?.image || ""}
                        width={40}
                        height={40}
                        className="rounded-full mr-4"
                        alt={"avatar"}
                      />
                    )}
                    <input
                      onFocus={() => setContentFocus(true)}
                      onChange={(e) => setContent(e.target.value)}
                      ref={commentInputRef}
                      value={content}
                      type="text"
                      className="w-full py-1 px-2  md:px-4 md:py-2 outline-none border-gray-200 rounded-full text-sm md:text-base border"
                      placeholder={`${
                        status === "authenticated"
                          ? pin.comments.length === 0
                            ? "Be the first person to comment"
                            : "Add a comment"
                          : "Please login first to comment"
                      }`}
                      disabled={status !== "authenticated"}
                    />
                  </div>

                  {contentFocus && (
                    <div className=" self-end gap-x-2 flex items-center  mt-2">
                      <button
                        className="py-1 px-2  md:px-4 md:py-2 bg-gray-200 text-gray-800 font-semibold rounded-full"
                        onClick={() => {
                          setContentFocus(false);
                          commentInputRef.current.value = "";
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="font-semibold bg-[#E60023] text-white rounded-full py-1 px-2  md:px-4 md:py-2"
                        disabled={content.length <= 0}
                      >
                        Done
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <RelatedPinsComponent pins={relatedPins?.relatedPins} />
    </Container>
  );
};

export default PinDetail;
