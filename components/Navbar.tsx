import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Navbar = () => {


    const { user } = useUser();
    const router = useRouter();
  return (
    <nav className='py-4 px-2 max-w-7xl mx-auto'>
        <ul className='flex items-center justify-between'>
            <div className="flex items-center space-x-6 font-semibold text-lg">
                <Link href="/">
                    <Image className='cursor-pointer' width={30} height={30} alt='logo' src="https://www.freepnglogos.com/uploads/pinterest-logo-p-png-0.png" />
                
                </Link>
                <li>
                    <Link href="/pin-builder">Create</Link>
                </li>
            </div>
    
            {user ? (
                <button className='rounded-full px-4 py-2 bg-[#E60023] text-white font-semibold' onClick={()=>router.push("/api/auth/logout")}>Logout</button>
            ):(
                <button className='rounded-full px-4 py-2 bg-[#E60023] text-white font-semibold' onClick={()=>router.push("/api/auth/login")}>Login</button>

            )}
        </ul>
    </nav>
  )
}

export default Navbar