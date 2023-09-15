import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { HiPlusCircle } from "react-icons/hi";
import useMediaQuery from "../hooks/useMediaQuery";
import { useQuery } from "@apollo/client";
import { SingleUserQuery } from "../lib/query";

const UserProfile = () => {
  //   const { data: session } = useSession();
  const isNotMobile = useMediaQuery("(min-width: 768px)");
  const router = useRouter();
  const { userId } = router?.query;
  const { data, loading, error } = useQuery(SingleUserQuery, {
    variables: {
      userId,
    },
  });

  return (
    <main className="flex justify-center items-center flex-col text-center">
      <div className="w-1/2 h-44 sm:h-60 md:h-80 rounded-3xl bg-gray-200 relative">
        <HiPlusCircle className="text-gray-50 text-2xl sm:text-4xl md:text-5xl absolute bottom-0 right-0" />
      </div>
      <div className="my-8">
        <Image
          src={data?.user?.image || ""}
          className="rounded-full "
          width={isNotMobile ? 100 : 50}
          height={isNotMobile ? 100 : 50}
          alt="avatar"
        />
      </div>
      <div>
        <h1 className="text-2xl font-semibold">{data?.user?.name}</h1>
        <p className="text-sm text-gray-400">{data?.user?.email}</p>
      </div>
      <nav>
        <ul className="flex gap-x-4 font-semibold">
          <li
            className={`${
              router.pathname.includes("/created")
                ? "border-b-2 border-[#E60023]"
                : ""
            }`}
          >
            <Link href={`/user/${userId}/created`}>Created</Link>
          </li>
          <li
            className={`${
              router.pathname.includes("/saved")
                ? "border-b-2 border-[#E60023]"
                : ""
            }`}
          >
            <Link href={`/user/${userId}/saved`}>Saved</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
};

export default UserProfile;
