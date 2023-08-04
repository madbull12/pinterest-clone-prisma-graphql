import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FiHome, FiLogIn, FiPlus, FiSearch } from "react-icons/fi";
import { MdExplore } from "react-icons/md";
import { useRecoilState } from "recoil";
import { searchModalState } from "../atom/searchAtom";

const MobileNav = () => {
  const { status, data: session } = useSession();
  const [_, setSearchOpen] = useRecoilState(searchModalState);
  const router = useRouter();
  return (
    <nav className="flex z-[999] gap-x-2 text-2xl list-none fixed bottom-0 right-0 left-0 items-center bg-white justify-between p-4 text-gray-500">
      <li className="cursor-pointer">
        <Link href="/">
          <FiHome
            className={`${router.pathname === "/" ? "text-black" : null}`}
          />
        </Link>
      </li>
      <li
        className="cursor-pointer"
        onClick={() => {
          setSearchOpen(true);
          window.scroll(0, 0);
        }}
      >
        <FiSearch />
      </li>
      <li className="cursor-pointer">
        <Link href="/pin-builder">
          <FiPlus
            className={`${
              router.pathname === "/pin-builder" ? "text-black" : null
            }`}
          />
        </Link>
      </li>
      <li className="cursor-pointer">
        <Link href={"/explore"}>
          <MdExplore
            className={`${
              router.pathname === "/explore" ? "text-black" : null
            }`}
          />
        </Link>
      </li>
      <li className="cursor-pointer">
        {status === "authenticated" ? (
          <Link href="/user/saved">
            <Image
              src={session?.user?.image || ""}
              width={35}
              height={35}
              className="rounded-full"
            />
          </Link>
        ) : (
          <FiLogIn onClick={() => signIn()} />
        )}
      </li>
    </nav>
  );
};

export default MobileNav;
