import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Button from './Button'
import Search from './Search'

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
            <Search />
            <div className='flex items-center gap-x-2'>
                {user ? (
                    <Button text="Logout" handleClick={()=>router.push("/api/auth/logout")} />
                ):(
                    <Button text="Login" handleClick={()=>router.push("/api/auth/login")} />

                )}
                {user && (
                    <Link href="/user/created">
                     <Image src={user?.picture || ""} alt="avatar" width={40} height={40} className="cursor-pointer rounded-full" />
                    
                    </Link>

                )}
            </div>
    
           
        </ul>
    </nav>
  )
}

export default Navbar