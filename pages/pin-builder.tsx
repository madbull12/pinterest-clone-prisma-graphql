import React, { Context, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import prisma from "../lib/prisma";
import { createPinMutation } from "../lib/mutation";
import { UserIdQuery } from "../lib/query";
import { HiDotsHorizontal, HiTrash, HiUpload } from "react-icons/hi";
import { MdFileUpload, MdUpload } from "react-icons/md";
import Image from "next/image";
import Button from "../components/Button";
import { getSession, useSession } from "next-auth/react";


interface IFormInput {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

const PinBuilder = () => {
  const { data:session }:any = useSession();
  const [textAreaFocus, setTextAreaFocus] = useState(false);
  const [textAreaCount, setTextAreaCount] = useState(500);
  const [categories, setCategories] = useState<any>([]);

  // const [imageSrc, setImageSrc] = useState<any>();
  // const [uploadData, setUploadData] = useState<any>();
  const [selectedFile, setSelectedFile] = useState<any>();
  const [preview, setPreview] = useState<string>();
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<IFormInput>();
  // const { data } = useQuery(UserIdQuery, {
  //   variables: {
  //     userId: session?.user?.email,
  //   },
  // });

  // const userId = data?.user.id;
  const [createPin, { error }] = useMutation(createPinMutation, {
    onCompleted: () => reset(),
  });

  // image change

  // function handleOnChangeImage(changeEvent:any) {
  //     const reader = new FileReader();

  //     reader.onload = function(onLoadEvent) {
  //       setImageSrc(onLoadEvent.target?.result);
  //     }

  //     reader.readAsDataURL(changeEvent.target.files[0]);
  //   }

  const addCategory = () => {
    const category = getValues("category");

    if (categories.includes(category) || category === "") {
      toast.error("Category can't be the same or empty!", {
        duration: 2000,
      });
    } else {
      setCategories((prev: any) => [...prev, category]);
    }

    reset({
      category: "",
    });
  };

  const onSubmit = async (data: IFormInput) => {
    console.log(data);
    const { title, description } = data;

    // upload image
    const formData = new FormData();
    formData.append("file", selectedFile);

    formData.append("upload_preset", "uploads");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dem2vt6lj/image/upload",
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
      userId:session?.user.id,
    };
    try {
      await toast.promise(createPin({ variables }), {
        loading: "Creating new pin..",
        success: "Pin successfully created!🎉",
        error: `Something went wrong 😥 Please try again -  ${error}`,
      });
    } catch (error) {
      console.error(error);
    }
  };
  console.log(textAreaFocus);
  return (
    <div className="min-h-screen bg-gray-200 py-8">
      <form
        className="shadow-md p-8 rounded-2xl max-w-3xl bg-white mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center justify-between">
          <HiDotsHorizontal className="text-2xl text-gray-400" />
          <button
            className="rounded-full bg-[#E60023] px-4 py-2 text-white font-semibold"
            type="submit"
          >
            Publish
          </button>
        </div>
        <div className="flex gap-x-4 mt-2">
          {selectedFile ? (
            <>
              {selectedFile.type === "video/mp4" ? (
                <video controls className="relative h-full w-full rounded-2xl">
                  <source src={preview} type="video/mp4"></source>
                </video>
              ) : (
                <div className="relative w-1/2 h-full">
                  <img src={preview || ""}  className="w-full h-full rounded-lg " />
                  <button
                    className="absolute top-0 w-10 h-10 rounded-full bg-white place-items-center grid opacity-75 m-4"
                    onClick={() => setSelectedFile(undefined)}
                  >
                    <HiTrash />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-gray-200  rounded-lg w-1/2 cursor-pointer p-4">
              <div className="rounded-lg  cursor-center  space-y-2  text-gray-500  border-dashed border-2 p-4 border-gray-300 w-full h-full">
                <label
                  htmlFor="upload"
                  className="items-center flex flex-col justify-center pt-16 cursor-pointer"
                >
                  <HiUpload className="text-3xl" />
                  <p>Click to upload image or video</p>

                  <input
                    accept="image/png, image/gif, image/jpeg,video/mp4,video/x-m4v,video/*"
                    type="file"
                    id="upload"
                    onChange={onSelectFile}
                    className="h-full opacity-0 w-full cursor-pointer"
                  />
                </label>
              </div>
            </div>
          )}

          <div className="flex flex-col w-1/2 space-y-3  ">
            <input
              className="p-2 text-4xl text-gray-800 focus:border-blue-500 focus:border-b-2 placeholder:text-gray-500 outline-none border-gray-300 border-b font-bold"
              type="text"
              placeholder="Add your title"
              {...register("title", { required: true })}
            />
            <div className="gap-x-3 items-center flex">
              <Image
                src={session?.user?.image || ""}
                width={50}
                height={50}
                className="rounded-full"
                alt="profile"
              />
              <p className="font-semibold">{session?.user?.name}</p>
            </div>
            <div className="flex flex-col">
              <textarea
                {...register("description")}
                className={`outline-none border-b p-2 ${
                  textAreaCount > 0
                    ? "focus:border-blue-500"
                    : "focus:border-red-500"
                } focus:border-b-2`}
                placeholder="Tell everyone what your pin is about"
                onFocus={() => setTextAreaFocus(true)}
                onBlur={() => setTextAreaFocus(false)}
                onChange={(e) => setTextAreaCount(500 - e.target.value.length)}
              />
              {textAreaFocus && (
                <>
                  {textAreaCount > 0 ? (
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <p>We recommend at least 100 characters</p>
                      <p>{textAreaCount}</p>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center text-xs text-red-600">
                      <p>
                        Ooops! This description is getting long. Try trimming it
                        down.
                      </p>
                      <p>{textAreaCount}</p>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center justify-between">
              <input
                className="px-4 py-2 outline-none focus:border-blue-500 focus:border-b-2"
                placeholder="Add categories"
                type="text"
                {...register("category", { required: true })}
              />
              {/* <Button
                text="Add"
                handleClick={(e: React.SyntheticEvent) => {
                  e.preventDefault();

                  addCategory();
                }}
              /> */}
              <button
                onClick={(e) => {
                  e.preventDefault();

                  addCategory();
                }}
                className="px-4 py-1 bg-[#E60023] text-white font-semibold rounded-full"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export const getServerSideProps = async ({ req }:any) => {
  const session = await getSession();
  console.log(session)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

export default PinBuilder;
