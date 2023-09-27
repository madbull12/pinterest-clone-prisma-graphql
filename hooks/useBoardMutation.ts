import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import { z } from "zod";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
// const boardSchema = z.object({
//     name:z.string(),
//     secret:z.boolean()
// })

type FormValues = {
  name: string;
  secret: boolean;
  description?: string;
};

const useBoardMutation = (payload: FormValues, callback: () => void) => {
  console.log(payload);
  const utils = trpc.useContext();
  const router = useRouter();
  const { boardId } = router?.query;
  const { data: session } = useSession();
  const { mutateAsync: createBoard } = trpc.board.createBoard.useMutation({
    onMutate: async () => {
      await utils.board.userBoards.cancel();
      const previousValue = utils.board.userBoards.getData();

      return { previousValue };
    },
    onError: (err, _, ctx) => {
      console.log(err);
      // If the mutation fails, use the context-value from onMutate
      utils.board.userBoards.setData(
        { userId: session?.user?.id as string },
        ctx?.previousValue
      );
    },
    onSettled: () => {
      utils.board.userBoards.invalidate({
        userId: session?.user?.id as string,
      });
    },
  });
  const { mutateAsync: updateBoard } = trpc.board.updateBoard.useMutation({
    onMutate: async () => {
      await utils.board.boardPins.cancel({ boardId:boardId as string});
      const previousValue = utils.board.boardPins.getData({ boardId:boardId as string});

      return { previousValue };
    },
    onError: (err, _, ctx) => {
      console.log(err);
      // If the mutation fails, use the context-value from onMutate
      utils.board.boardPins.setData(
        { boardId:boardId as string },
        ctx?.previousValue
      );
    },
    onSettled: () => {
      utils.board.boardPins.invalidate({
        boardId: boardId as string,
      });
    },
  });
  const { mutateAsync: deleteBoard } = trpc.board.deleteBoard.useMutation({
    onMutate: async () => {
      await utils.board.userBoards.cancel();
      const previousValue = utils.board.userBoards.getData();

      return { previousValue };
    },
    onError: (err, _, ctx) => {
      console.log(err);
      // If the mutation fails, use the context-value from onMutate
      utils.board.userBoards.setData(
        { userId: session?.user?.id as string },
        ctx?.previousValue
      );
    },
    onSettled: () => {
      utils.board.userBoards.invalidate({
        userId: session?.user?.id as string,
      });
    },
  });

  const handleCreateBoard = async () => {
    try {
      await toast.promise(
        createBoard({ name: payload.name, secret: payload.secret }),
        {
          loading: "Creating new board..",
          success: "Board successfully created!🎉",
          error: `Something went wrong 😥 Please try again `,
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      callback();
    }
  };
  const handleUpdateBoard = async () => {
    try {
      await toast.promise(
        updateBoard({
          name: payload.name,
          secret: payload.secret,
          description: payload?.description as string,
          id: boardId as string,
        }),
        {
          loading: "Updating board..",
          success: "Board successfully updated!🎉",
          error: `Something went wrong 😥 Please try again `,
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      callback();
    }
  };
  const handleDeleteBoard = async () => {
    try {
      await toast.promise(deleteBoard({ boardId: boardId as string }), {
        loading: "Deleting board..",
        success: "Board successfully deleted",
        error: `Something went wrong 😥 Please try again `,
      });
    } catch (err) {
      console.log(err);
    } finally {
      callback();
      router.back();
    }
  };

  return { handleCreateBoard, handleUpdateBoard, handleDeleteBoard };
};

export default useBoardMutation;
