import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import { deleteSaveMutation, savePinMutation } from "../lib/mutation";
import { UserBoardsQuery } from "../lib/query";
import { trpc } from "../utils/trpc";

interface SavedPayload {
  userId: string;
  boardId: string;
  pinId: string;
}

export const useSavedMutation = ({ userId, boardId, pinId }: SavedPayload) => {
  const utils = trpc.useContext();

  const { mutateAsync: savePin } = trpc.saved.savePin.useMutation({
    onMutate:async()=>{
        await utils.board.getYourBoards.cancel();

        const previousValue = utils.board.getYourBoards.getData();
        
        return { previousValue }
    },
    onError(err, _, ctx) {
        console.log(err);
        // If the mutation fails, use the context-value from onMutate
        utils.board.getYourBoards.setData(undefined, ctx?.previousValue);
      },
      onSettled() {
        // Sync with server once mutation has settled
        utils.board.getYourBoards.invalidate()
      },
  });
  const { mutateAsync: deleteSavedPin } =
    trpc.saved.deleteSavedPin.useMutation({
        onMutate:async()=>{
            await utils.board.getYourBoards.cancel();
    
            const previousValue = utils.board.getYourBoards.getData();
            
            return { previousValue }
        },
        onError(err, _, ctx) {
            console.log(err);
            // If the mutation fails, use the context-value from onMutate
            utils.board.getYourBoards.setData(undefined, ctx?.previousValue);
          },
          onSettled() {
            // Sync with server once mutation has settled
            utils.board.getYourBoards.invalidate()
          },
      });
  //   const [deleteSavedPin] = useMutation(deleteSaveMutation, {
  //     refetchQueries: [UserBoardsQuery],
  //   });

  const handleSavePin = async () => {
    try {
      await toast.promise(
        savePin({
          userId,
          boardId,
          pinId,
        }),
        {
          loading: "Saving pin.",
          success: "Pin successfully saved!🎉",
          error: (err) => `${err}`,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteSavedPin = async (savedId: string) => {
    try {
      await toast.promise(
        deleteSavedPin({
          pinId: savedId,
        }),
        {
          loading: "Unsaving pin.",
          success: "Pin successfully unsaved!🎉",
          error: (err) => `Something went wrong 😥 Please try again ${err}`,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleSavePin,
    handleDeleteSavedPin,
  };
};
