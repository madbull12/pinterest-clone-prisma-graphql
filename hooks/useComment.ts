import { z } from "zod";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

type Payload = {
  content: string;
  pinId: string;
};

export function useComment(payload: Payload,reset:()=>void) {
  const { content,  pinId } = payload;

  console.log(content)
  const { data: session } = useSession();
  const utils = trpc.useContext();
  const { mutateAsync: addComment } = trpc.comment.addComment.useMutation({
    onMutate: async () => {
      await utils.pin.getPin.cancel({ pinId });

      const previousValue = utils.pin.getPin.getData({ pinId });

      return { previousValue };
    },
    onError: (err, _, ctx) => {
      console.log(err);
      // If the mutation fails, use the context-value from onMutate
      utils.pin.getPin.setData({ pinId }, ctx?.previousValue);
    },
    onSettled: () => {
      utils.pin.getPin.invalidate({ pinId });
    },
  });

  const handleAddComment = async () => {
    const variables = {
      content,
      userId: session?.user?.id as string,
      pinId,
    };
    try {
      await toast.promise(addComment({ ...variables }), {
        loading: "Posting comment...",
        success: "Comment posted 👏👏",
        error: "Oops something went wrong 😢",
      });
    } catch (error) {
      console.error(error);
    } finally{
        reset()
    }
  };

  return { handleAddComment };
}
