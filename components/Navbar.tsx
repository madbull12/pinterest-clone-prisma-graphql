import Image from "next/image";
import Link from "next/link";
import React from "react";
import Search from "./Search";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@nextui-org/react";

const Navbar = () => {
  const { status, data: session } = useSession();
  return (
    <nav className="py-4 px-2 max-w-7xl mx-auto">
      <ul className="flex items-center justify-between">
        <div className="flex items-center space-x-6 font-semibold text-lg">
          <Link href="/">
            <Image
              className="cursor-pointer"
              width={30}
              height={30}
              alt="logo"
              src="https://www.freepnglogos.com/uploads/pinterest-logo-p-png-0.png"
            />
          </Link>
          {status === "authenticated" ? (
            <Link href="/pin-builder">Create</Link>
          ) : null}
          <Link href="/explore">Explore</Link>
        </div>
        <Search />
        <div className="flex items-center gap-x-2">
          {status === "authenticated" ? (
            <Button
              className="bg-[#E60023] text-white font-semibold"
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              className="bg-[#E60023] text-white font-semibold"
              onClick={(e) => {
                e.preventDefault();
                signIn("google");
              }}
            >
              Login
            </Button>
          )}
          {status === "authenticated" && (
            <Link href={`/user/${session.user?.id}/created`}>
              <Image
                src={session?.user?.image || ""}
                alt="avatar"
                width={40}
                height={40}
                className="cursor-pointer rounded-full"
              />
            </Link>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
