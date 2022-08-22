import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { HiPlusCircle } from 'react-icons/hi';

const UserProfile = () => {
    const { user } = useUser();
    const router = useRouter();
  return (
    <main className='flex justify-center items-center flex-col text-center'>
        <div className='w-1/2 h-80 rounded-3xl bg-gray-200 relative'>
            <HiPlusCircle className='text-gray-50 text-5xl absolute bottom-0 right-0' />
        </div>
        <div className='-mt-14'>
         <Image src={user?.picture || ""} className="rounded-full " width={100} height={100} alt="avatar" />
        </div>
        <div>
            <h1 className='text-2xl font-semibold'>{user?.name}</h1>
            <p className='text-sm text-gray-400'>@{user?.nickname}</p>
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