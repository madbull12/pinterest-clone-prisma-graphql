import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { UseFormReset,UseFormGetValues } from "react-hook-form";
import { IFormPinInput } from "../interface";

type Payload = {
  title: string;
  description?: string;
};

const usePinCreation = (data: Payload,reset: UseFormReset<IFormPinInput>,getValues:UseFormGetValues<IFormPinInput>) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string>();
  const router = useRouter();
  const { data: session } = useSession();
  const utils = trpc.useContext();
  const { mutateAsync: createPin } = trpc.pin.createPin.useMutation();
  const [categories, setCategories] = useState<string[]>([]);

  
  const deleteCategory = (index: number) => {
    setCategories(categories.filter((_, _index) => _index != index));
  };

  const addCategory = () => {
    const category = getValues("category");

    if (categories.includes(category) || category === "") {
      toast.error("Category can't be the same or empty!", {
        duration: 2000,
      });
    } else {
      setCategories((prev) => [...prev, category]);
    }

    reset({
      category:""
    })
  };

  const removeSelectedFile = () => {
    setSelectedFile(undefined);
  }

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const handleCreatePin = async () => {
    console.log(data);
    const { title, description } = data;

    console.log(categories);

    // upload image

    if (categories?.length === 0) {
      toast.error("Please add some categories");
    } else {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile as File);

        formData.append("upload_preset", "uploads");

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dem2vt6lj/${
            selectedFile?.type === "video/mp4" ? "video" : "image"
          }/upload`,
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => res.json());
        console.log(res);

        // end of upload image
        const media = res.secure_url;
        const variables = {
          title,
          categories,
          description,
          media,
        };
        await toast.promise(createPin({ ...variables }), {
          loading: "Creating new pin..",
          success: "Pin successfully created!🎉",
          error: (error) =>
            `Something went wrong 😥 Please try again -  ${error}`,
        });
      } catch (error) {
        console.error(error);
      } finally {
        reset();
        router.push("/");

      }
    }
  };

  return { addCategory, handleCreatePin, categories, deleteCategory,removeSelectedFile,onSelectFile,selectedFile,preview };
};

export default usePinCreation;
