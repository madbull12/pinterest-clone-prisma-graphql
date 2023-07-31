import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import { deleteSaveMutation, savePinMutation } from "../lib/mutation";
import { UserBoardsQuery } from "../lib/query";

interface SavedPayload {
    userId:string;
    boardId:string;
    pinId:string;
}

export const useSavedMutation = ({ userId,boardId,pinId }:SavedPayload) => {
    const [savePin] = useMutation(savePinMutation, {
 
        refetchQueries: [UserBoardsQuery],
      });
    const [deleteSavedPin] = useMutation(deleteSaveMutation, {
 
        refetchQueries: [UserBoardsQuery],
      });

    
    const handleSavePin = async() => {
        try {
            await toast.promise(
                savePin({variables:{
                    userId,
                    boardId,
                    pinId
                }}),{
                    loading: "Saving pin.",
                    success: "Pin successfully saved!🎉",
                    error:(err)=> `${err}`,
                  }
            );
        } catch (error) {
            console.log(error);
        }
    }
    const handleDeleteSavedPin = async(savedId:string) => {
        try {
            await toast.promise(
                deleteSavedPin({variables:{
                    saveId:savedId
                }}),{
                    loading: "Unsaving pin.",
                    success: "Pin successfully unsaved!🎉",
                    error:(err)=> `Something went wrong 😥 Please try again ${err}`,
                  }
            );
        } catch (error) {
            console.log(error);
        }
    }

    return {
        handleSavePin,
        handleDeleteSavedPin
    }
}