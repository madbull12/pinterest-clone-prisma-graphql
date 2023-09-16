import React, { useState } from "react";
import { useComment } from "../hooks/useComment";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Image from "next/image";

type FormValues = {
  content: string;
};

const CommentForm = ({noComments}:{noComments:boolean}) => {
  const router = useRouter();

  const { pinId } = router.query;
  const { data: session, status } = useSession();
  const { register, handleSubmit, watch, reset } = useForm<FormValues>();
  const [contentFocus, setContentFocus] = useState<boolean>(false);
  const { handleAddComment } = useComment(
    {
      content: watch("content"),
      pinId: pinId as string,
    },
    reset
  );
  return (
    <form className="flex flex-col" onSubmit={handleSubmit(handleAddComment)}>
      <div className="flex gap-x-2 w-full items-center ">
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
          {...register("content")}
          type="text"
          className="w-full py-1 px-2  md:px-4 md:py-2 outline-none border-gray-200 rounded-full text-sm md:text-base border"
          placeholder={`${
            status === "authenticated"
              ? noComments
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
              reset();
            }}
          >
            Cancel
          </button>
          <button
            className="font-semibold bg-[#E60023] text-white rounded-full py-1 px-2  md:px-4 md:py-2"
            disabled={watch("content")?.length <= 0}
          >
            Done
          </button>
        </div>
      )}
    </form>
  );
};

export default CommentForm;
