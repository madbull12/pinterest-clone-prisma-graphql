import { useRecoilValue } from "recoil";
import { trpc } from "../utils/trpc";
import { editModalState, editPinValue } from "../atom/editAtom";
import { Pin } from "@prisma/client";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

type Payload = {
  title?: string;
  description?: string;
  boardId?: string;
};

const usePinEdit = (data: Payload, callback: () => void) => {
  const utils = trpc.useContext();
  const { data: session } = useSession();
  const { mutateAsync: updatePin } = trpc.pin.updatePin.useMutation();
  const { mutateAsync: deletePin } = trpc.pin.deletePin.useMutation({
    onMutate: async () => {
      await utils.pin.createdPins.cancel();
      const previousValue = utils.pin.createdPins.getData();

      return { previousValue };
    },
    onError: (err, _, ctx) => {
      console.log(err);
      // If the mutation fails, use the context-value from onMutate
      utils.pin.createdPins.setData(
        { userId: session?.user?.id as string},
        ctx?.previousValue
      );
    },
    onSettled: () => {
      utils.pin.createdPins.invalidate({ userId: session?.user?.id });
    },
  });
  const editPin = useRecoilValue<Pin | null>(editPinValue);

  const handleUpdatePin = async () => {
    console.log(editPin?.id);

    try {
      await toast.promise(
        updatePin({
          pinId: editPin?.id as string,
          boardId:data?.boardId as string,
          description: data?.description as string,
          title: data.title as string,
        }),
        {
          loading: "Updating pin",
          success: "Pin successfully updated",
          error: "Something went wrong!",
        }
      );
    } catch (err) {
      throw new Error("Something went wrong" + err);
    } finally {
      callback();
    }
  };
  const handleDeletePin = async () => {
    try {
      await toast.promise(
        deletePin({
          pinId: editPin?.id as string,
        }),
        {
          loading: "Deleting pin",
          success: "Pin successfully deleted",
          error: "Something went wrong",
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      callback();
    }
  };

  return {
    handleUpdatePin,
    handleDeletePin,
  };
};

export default usePinEdit;
