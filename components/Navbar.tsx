import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";
import Search from "./Search";
import { useSession, signIn, signOut } from "next-auth/react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
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
          {status==="authenticated" ? (
            <Link href="/pin-builder">Create</Link>

          ):null}
            <Link href="/explore">Explore</Link>

        </div>
        <Search />
        <div className="flex items-center gap-x-2">
          {status === "authenticated" ? (
            <Button text="Logout" handleClick={() => signOut()} />
          ) : (
            <Button text="Login" handleClick={() => signIn("google")} />
          )}
          {status === "authenticated" && (
            <Link href="/user/created">
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
