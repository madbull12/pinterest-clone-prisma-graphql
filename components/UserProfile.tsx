import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { HiPlusCircle } from 'react-icons/hi';
import { useSession } from "next-auth/react";
import useMediaQuery from '../hooks/useMediaQuery';


const UserProfile = () => {
    const { data:session } = useSession();
    const isNotMobile = useMediaQuery('(min-width: 768px)')
    const router = useRouter();
  return (
    <main className='flex justify-center items-center flex-col text-center'>
        <div className='w-1/2 h-44 sm:h-60 md:h-80 rounded-3xl bg-gray-200 relative'>
            <HiPlusCircle className='text-gray-50 text-2xl sm:text-4xl md:text-5xl absolute bottom-0 right-0' />
        </div>
        <div className='-mt-8 md:-mt-14'>
         <Image src={session?.user?.image || ""} className="rounded-full " width={isNotMobile ? 100 : 50 } height={isNotMobile ? 100 : 50 } alt="avatar" />
        </div>
        <div>
            <h1 className='text-2xl font-semibold'>{session?.user?.name}</h1>
            <p className='text-sm text-gray-400'>{session?.user?.email}</p>
        </div>
        <nav>
            <ul className='flex gap-x-4 font-semibold'>
                <li className={`${router.pathname === "/user/created" ? "border-b-2 border-black" : ""}`}>
                    <Link href='/user/created'>Created</Link>
                </li>
                <li className={`${router.pathname === "/user/saved" ? "border-b-2 border-black" : ""}`}>
                    <Link href='/user/saved'>Saved</Link>
                </li>
            </ul>
        </nav>
        
    </main>
  )
}

export default UserProfile