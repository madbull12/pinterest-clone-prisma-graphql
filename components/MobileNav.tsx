import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FiHome, FiLogIn, FiLogOut, FiPlus, FiSearch, FiUser } from "react-icons/fi";

const MobileNav = () => {
  const { status,data:session } = useSession();
  const router = useRouter()
  return (
    <nav className="flex z-[999] gap-x-2 text-2xl list-none fixed bottom-0 right-0 left-0 items-center bg-white justify-between p-4 text-gray-500">
      <li className="cursor-pointer">
        <Link href="/">
          <FiHome className={`${router.pathname === "/" ? "text-black" : null }`} />
        </Link>
      </li>
      <li className="cursor-pointer">
        <Link href="/">
          <FiSearch />
        </Link>
      </li>
      <li className="cursor-pointer">
        <Link href="/">
          <FiPlus />
        </Link>
      </li>
      <li className="cursor-pointer">
        {status === "authenticated" ? (
          <FiLogOut onClick={() => signOut()} />
        ) : (
          <FiLogIn onClick={() => signIn()} />
        )}
      </li>
      <li className="cursor-pointer">
        <Link href="/user/saved">
          <Image
            src={session?.user?.image || ""}
            width={35}
            height={35}
            className="rounded-full"
          />
        </Link>
      </li>

    </nav>
  );
};

export default MobileNav;
