import toast from "react-hot-toast";
import apolloClient from "../lib/apollo";
import { savePinMutation } from "../lib/mutation";

export default async function savePin(userId:string,boardId:string,pinId:string) {
    try {
        await toast.promise(
            apolloClient.mutate({
                mutation:savePinMutation,
                variables:{
                    userId,
                    boardId,
                    pinId
                }
              }),{
                loading: "Saving pin.",
                success: "Pin successfully created!🎉",
                error: `Something went wrong 😥 Please try again `,
              }
        );
    } catch(err) {
        console.log(err)
    }
}